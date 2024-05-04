from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register('prediction', views.TimeSeriesViewSet, basename='timeseriesprediction')

urlpatterns = [
    path('', include(router.urls)),
]
