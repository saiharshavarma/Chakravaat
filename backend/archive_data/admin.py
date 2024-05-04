from django.contrib import admin
from .models import Archive

class ArchiveAdmin(admin.ModelAdmin):
    list_display = ('id', 'timestamp', 'wind', 'pressure', 'name', 'category')

admin.site.register(Archive, ArchiveAdmin)