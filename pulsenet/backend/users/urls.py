from django.urls import path
from .views import register, follow_user, me
from .views import me
from .views import my_posts

urlpatterns = [
    path('register/', register),
    path('follow/<str:username>/', follow_user),
    path('me/', me),
    path('my-posts/', my_posts),
]