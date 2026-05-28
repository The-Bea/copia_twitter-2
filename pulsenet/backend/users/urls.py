from django.urls import path
from .views import (
    register,
    follow_user,
    is_following,
    me,
    my_posts,
    update_profile,
    get_user
)

urlpatterns = [
    path('register/', register),

    # social system
    path('follow/<int:user_id>/', follow_user),
    path('is-following/<int:user_id>/', is_following),
    path('<int:user_id>/', get_user),

    # profile
    path('me/', me),
    path('update-profile/', update_profile),

    # posts do usuário
    path('my-posts/', my_posts),
]