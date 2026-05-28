from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.contrib.auth.models import User

from .serializers import RegisterSerializer
from .models import Follow, Profile

from posts.models import Post
from posts.serializers import PostSerializer


# -----------------------------
# REGISTER
# -----------------------------
@api_view(['POST'])
def register(request):
    serializer = RegisterSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)

    return Response(serializer.errors)


# -----------------------------
# FOLLOW / UNFOLLOW
# -----------------------------
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def follow_user(request, user_id):
    try:
        target = User.objects.get(id=user_id)
    except User.DoesNotExist:
        return Response({'error': 'Usuário não encontrado'}, status=404)

    if target == request.user:
        return Response({'error': 'Você não pode seguir você mesmo'}, status=400)

    follow, created = Follow.objects.get_or_create(
        follower=request.user,
        following=target
    )

    if not created:
        follow.delete()
        return Response({'status': 'unfollow'})

    return Response({'status': 'follow'})


# -----------------------------
# CHECK IF FOLLOWING
# -----------------------------
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def is_following(request, user_id):
    try:
        target = User.objects.get(id=user_id)
    except User.DoesNotExist:
        return Response({'error': 'Usuário não encontrado'}, status=404)

    following = Follow.objects.filter(
        follower=request.user,
        following=target
    ).exists()

    return Response({'following': following})


# -----------------------------
# ME (USER LOGADO)
# -----------------------------
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def me(request):
    user = request.user

    return Response({
        'id': user.id,
        'username': user.username,
    })


# -----------------------------
# MY POSTS
# -----------------------------
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def my_posts(request):
    posts = Post.objects.filter(user=request.user).order_by('-created_at')
    serializer = PostSerializer(posts, many=True)
    return Response(serializer.data)


# -----------------------------
# UPDATE PROFILE
# -----------------------------
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_profile(request):
    user = request.user
    profile = user.profile

    username = request.data.get('username')
    if username:
        user.username = username

    password = request.data.get('password')
    if password:
        user.set_password(password)

    bio = request.data.get('bio')
    if bio is not None:
        profile.bio = bio

    user.save()
    profile.save()

    return Response({
        "status": "updated",
        "username": user.username,
        "bio": profile.bio
    })