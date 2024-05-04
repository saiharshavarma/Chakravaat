from django.db import models

class Archive(models.Model):
    wind = models.DecimalField(decimal_places=5, max_digits=25, default = 0)
    pressure = models.DecimalField(decimal_places=2, max_digits=25, default = 0)
    name = models.CharField(max_length = 100, default=None)
    category = models.CharField(max_length = 50, default=None)
    original_img = models.ImageField(upload_to='archive/', default='image.jpg')
    timestamp = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    
    def __str__(self):
        return "Archive data: " + str(self.timestamp)