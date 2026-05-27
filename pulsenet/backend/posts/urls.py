from django.urls import path
from .views import *

urlpatterns = [
    path('feed/', feed),
    path('create/', create_post),
    path('like/<int:pk>/', like_post),
    path('comment/<int:pk>/', add_comment),
]