from django.contrib import admin
from .models import ImagePrediction

class ImagePredictionAdmin(admin.ModelAdmin):
    list_display = ('id', 'timestamp', 'wind', 'pressure', 't_number', 'category')

admin.site.register(ImagePrediction, ImagePredictionAdmin)