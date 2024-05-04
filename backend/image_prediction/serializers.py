from rest_framework import serializers
from .models import ImagePrediction

class ImagePredictionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ImagePrediction
        fields = ['id', 'wind', 'pressure', 't_number', 'category', 'original_img', 'timestamp']
