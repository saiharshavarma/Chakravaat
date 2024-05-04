from rest_framework import serializers
from .models import Archive

class ArchiveSerializer(serializers.ModelSerializer):
    class Meta:
        model = Archive
        fields = ['id', 'wind', 'pressure', 'name', 'category', 'original_img', 'timestamp']
