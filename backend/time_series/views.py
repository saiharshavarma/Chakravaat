from django.shortcuts import render, HttpResponse
import tensorflow as tf
import numpy as np
from rest_framework import viewsets
from rest_framework.response import Response
from archive_data.models import Archive
from real_time_prediction.models import RealTimePrediction
from archive_data.serializers import ArchiveSerializer
from real_time_prediction.serializers import RealTimePredictionSerializer
from sklearn.linear_model import LinearRegression
from skimage.segmentation import chan_vese
from django.core.files.base import ContentFile
import io
import cv2
from PIL import Image

loaded_model_time = tf.keras.models.load_model('model_time_series.h5')

def image_crop(image, filename):
    crop_coords = (200, 500, 1060, 1280)
    cropped_image = image.crop(crop_coords)
    return np.array(cropped_image)

def apply_DoG(image):
    image_uint8 = (image * 255).astype(np.uint8)
    blurred1 = cv2.GaussianBlur(image_uint8, (9, 9), 1.0)
    blurred2 = cv2.GaussianBlur(image_uint8, (3, 3), 0.5)
    dog_image = blurred1 - blurred2
    return dog_image.astype(np.float32) / 255

def image_segmentation_level_sets(image):
    img_gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    mask = chan_vese(img_gray, mu=0.25, lambda1=1, lambda2=1, tol=1e-3)
    segmented_image = np.zeros_like(image)
    segmented_image[mask] = [255, 255, 255]
    return segmented_image

def load_and_preprocess_single_image(image_path):
    try:
        image = tf.io.read_file(image_path)
        image = tf.image.decode_jpeg(image, channels=3)

        image_array = np.array(image)
        image_pil = Image.fromarray(image_array)

        cropped_image_pil = image_crop(image_pil, image_path)
        cropped_image_array = np.array(cropped_image_pil)

        segmented_image = image_segmentation_level_sets(cropped_image_array)

        image = tf.convert_to_tensor(segmented_image)

        image = tf.image.resize(image, (256, 256))
        image = image / 255.0
        return image
    except Exception as err:
        print(err)
        return None

def getOtherMetrics(wind_speed):
    if wind_speed <= 65:
        return 1000, 1, 0
    elif wind_speed <= 90:
        return 987, 4, 1
    elif wind_speed <= 102:
        return 970, 5, 2
    elif wind_speed <= 115:
        return 960, 5.5, 3
    elif wind_speed <= 140:
        return 948, 6, 4
    else:
        return 921, 7, 5   

class TimeSeriesViewSets(viewsets.ModelViewSet):
    serializer_class = ArchiveSerializer
    queryset = Archive.objects.all().order_by('id')

    def list(self, request):
        global loaded_model_time

        crop_coords = (480, 0, 980, 500)
        crop_coords = (800, 650, 1900, 1800)
        crop_coords = (500, 400, 1200, 1000)
        crop_coords = (1600, 1600, 6500, 4950)
        new_image_path = 'static/real-time-scrap/processing.png'
        original_image_path = 'static/real-time-scrap/processing.png'
        ir_image_path = 'static/real-time-scrap/ir.jpg'
        original_image = Image.open(original_image_path)
        original_image = original_image.crop((200, 500, 1060, 1280))
        ir_image = Image.open(ir_image_path)
        ir_image = ir_image.crop((420, 450, 1550, 1290))  #(1600, 1600, 6500, 4900)

        print("Original image shape:", original_image.size)
        print("IR image shape:", ir_image.size)

        processed_image = load_and_preprocess_single_image(new_image_path)

        if processed_image is not None:
            processed_image = np.expand_dims(processed_image, axis=0)
            prediction = loaded_model_time.predict(processed_image)
            print(f'Predicted WMO_WIND: {prediction[0][0]}')

            original_image_rgba = original_image.convert("RGBA")
            original_buffer = io.BytesIO()
            original_image_rgba.save(original_buffer, format='PNG')
            original_buffer.seek(0)

            original_img = ContentFile(original_buffer.read(), name='original.png')

            pressure, t_number, category = getOtherMetrics(float(prediction[0][0]))

        real_time_obj = RealTimePrediction.objects.order_by('-timestamp').first()
        serializer_real = RealTimePredictionSerializer(RealTimePrediction.objects.order_by('-timestamp').first()).data

        previous_rows = RealTimePrediction.objects.filter(timestamp__lt=real_time_obj.timestamp).order_by('-timestamp')[:8]
        previous_wind_values = [row.wind for row in reversed(previous_rows)]
        previous_pressure_values = [row.pressure for row in reversed(previous_rows)]

        response_data = {
            "archive_data": serializer_real.data,
            "category": category,
            "t_number": t_number,
            "image": original_img,
            "next_wind_data": prediction,
            "previous_wind_data": previous_wind_values,
            "next_pressure_data": prediction,
            "previous_pressure_data": previous_pressure_values,
        }

        return Response(response_data)

    
class TimeSeriesViewSet(viewsets.ModelViewSet):
    serializer_class = ArchiveSerializer
    queryset = Archive.objects.all().order_by('id')

    def list(self, request):
        real_time_obj = RealTimePrediction.objects.order_by('-timestamp').first()
        serializer_real = RealTimePredictionSerializer(real_time_obj)

        previous_rows = RealTimePrediction.objects.filter(timestamp__lt=real_time_obj.timestamp).order_by('-timestamp')[:48:6]
        previous_wind_values = [row.wind for row in reversed(previous_rows)]
        previous_pressure_values = [row.pressure for row in reversed(previous_rows)]

        pw_1, pp_1 = np.array(previous_wind_values), np.array(previous_pressure_values)

        wind_values = []
        pressure_values = []
        for values, target in [(pw_1, wind_values), (pp_1, pressure_values)]:
            indices, X, model = np.arange(len(values)), np.arange(len(values)).reshape(-1, 1), LinearRegression()
            model.fit(X, values)
            next_indices = np.arange(len(values), len(values) + 4)
            target[:] = np.round(model.predict(next_indices.reshape(-1, 1)), 4) if target is wind_values else np.round(model.predict(next_indices.reshape(-1, 1)), 2)

        response_data = {
            "general_data": serializer_real.data,
            "next_wind_data": wind_values,
            "previous_wind_data": previous_wind_values,
            "next_pressure_data": pressure_values,
            "previous_pressure_data": previous_pressure_values,
        }

        return Response(response_data)