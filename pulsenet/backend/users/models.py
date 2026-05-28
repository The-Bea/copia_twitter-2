from django.contrib.auth.models import User
from django.db import models


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    bio = models.TextField(blank=True)
    avatar = models.ImageField(upload_to='avatars/', default='default.png')

    def __str__(self):
        return self.user.username


class Follow(models.Model):
    follower = models.ForeignKey(
        User,
        related_name='following_set',
        on_delete=models.CASCADE
    )

    following = models.ForeignKey(
        User,
        related_name='followers_set',
        on_delete=models.CASCADE
    )

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('follower', 'following')