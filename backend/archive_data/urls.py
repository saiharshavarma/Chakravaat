from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register('archive', views.ArchiveViewSet, basename='archive')

urlpatterns = [
    path('', include(router.urls)),
]
