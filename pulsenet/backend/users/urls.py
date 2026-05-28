from django.urls import path
from .views import register, follow_user, me, is_following, my_posts

urlpatterns = [
    path('register/', register),
    path('follow/<int:user_id>/', follow_user),
    path('is-following/<int:user_id>/', is_following),
    path('me/', me),
    path('my-posts/', my_posts),
]