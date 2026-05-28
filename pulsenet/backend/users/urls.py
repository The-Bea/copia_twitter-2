from django.urls import path
from .views import (
    register,
    follow_user,
    is_following,
    me,
    my_posts,
    update_profile
)

urlpatterns = [
    path('register/', register),

    # social system
    path('follow/<int:user_id>/', follow_user),
    path('is-following/<int:user_id>/', is_following),

    # profile
    path('me/', me),
    path('update-profile/', update_profile),

    # posts do usuário
    path('my-posts/', my_posts),
]