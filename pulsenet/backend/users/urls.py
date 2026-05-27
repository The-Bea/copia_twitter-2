from django.urls import path
from .views import register, follow_user

urlpatterns = [
    path('register/', register),
    path('follow/<str:username>/', follow_user),
]