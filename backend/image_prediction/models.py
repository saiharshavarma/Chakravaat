from django.db import models

class ImagePrediction(models.Model):
    wind = models.DecimalField(decimal_places=5, max_digits=25, default = 0)
    pressure = models.DecimalField(decimal_places=2, max_digits=25, default = 0)
    t_number = models.DecimalField(decimal_places=1, max_digits=25, default = 0)
    category = models.CharField(max_length = 50, default=None)
    original_img = models.ImageField(upload_to='image_upload/', default='image.jpg')
    timestamp = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    
    def __str__(self):
        return "Image Prediction at " + str(self.timestamp)