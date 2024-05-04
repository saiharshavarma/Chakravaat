from django.shortcuts import render, HttpResponse
from rest_framework import viewsets
from rest_framework.response import Response
from .models import Archive
from .serializers import ArchiveSerializer
from datetime import datetime

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

class ArchiveViewSet(viewsets.ModelViewSet):
    #serializer_class = ArchiveSerializer
    #queryset = Archive.objects.all().order_by('id')

    def create(self, request, *args, **kwargs):
        timestamp_str = request.data.get('timestamp')
        print(timestamp_str)
        #timestamp_str = "2020-12-04 09:05:00"
        if not timestamp_str:
            timestamp = datetime.now()
        else:
            timestamp = datetime.strptime(timestamp_str, '%Y-%m-%d %H:%M:%S')
        
        formatted_timestamp = timestamp.strftime('%Y-%m-%d %H:%M:%S')
        
        data_exists = Archive.objects.filter(timestamp__date=timestamp.date()).exists()
        archive_obj = Archive.objects.filter(timestamp__lte=formatted_timestamp).order_by('-timestamp').first()
    
        if not archive_obj:
            return Response({"message": "No matching or previous timestamp found in the database."}, status=404)
        
        serializer = ArchiveSerializer(archive_obj)

        previous_rows = Archive.objects.filter(timestamp__lt=archive_obj.timestamp).order_by('-timestamp')[:8]
        previous_wind_values = [row.wind for row in reversed(previous_rows)]
        previous_pressure_values = [row.pressure for row in reversed(previous_rows)]

        next_rows = Archive.objects.filter(timestamp__gt=archive_obj.timestamp).order_by('timestamp')[:8]
        wind_values = [row.wind for row in next_rows]
        pressure_values = [row.pressure for row in next_rows]
        
        for i in range(1, len(wind_values) - 1):
            if wind_values[i] == 0:
                wind_values[i] = wind_values[i - 1] if wind_values[i - 1] != 0 else wind_values[i + 1]
            if pressure_values[i] == 0:
                pressure_values[i] = pressure_values[i - 1] if pressure_values[i - 1] != 0 else pressure_values[i + 1]
        
        pressure, t_number, category = getOtherMetrics(max(previous_wind_values + wind_values))

        response_data = {
            "archive_data": serializer.data,
            "t_number": t_number,
            "next_wind_data": wind_values,
            "previous_wind_data": previous_wind_values,
            "next_pressure_data": pressure_values,
            "previous_pressure_data": previous_pressure_values,
            "data_exists": data_exists,
        }

        return Response(response_data)