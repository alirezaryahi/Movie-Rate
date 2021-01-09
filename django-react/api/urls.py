from django.urls import path, include
from rest_framework import routers

from .views import MovieViewset, RatingViewset, UserViewset

router = routers.DefaultRouter()
router.register('users', UserViewset)
router.register('movies', MovieViewset)
router.register('ratings', RatingViewset)

urlpatterns = [
    path('', include(router.urls)),
]
