from django.contrib.auth.models import User
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from users.models import Follow
from .models import Post, Comment
from .serializers import PostSerializer, CommentSerializer
from users.models import Profile


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def feed(request):
    following = request.user.profile.following.all()

    posts = Post.objects.filter(
        user__profile__in=following
    ).order_by('-created_at')

    serializer = PostSerializer(posts, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_post(request):
    post = Post.objects.create(
        user=request.user,
        content=request.data['content']
    )

    serializer = PostSerializer(post)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def like_post(request, pk):
    post = Post.objects.get(id=pk)

    if request.user in post.likes.all():
        post.likes.remove(request.user)
    else:
        post.likes.add(request.user)

    return Response({'likes': post.likes.count()})

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_comment(request, pk):
    post = Post.objects.get(id=pk)

    comment = Comment.objects.create(
        post=post,
        user=request.user,
        content=request.data['content']
    )

    serializer = CommentSerializer(comment)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def me(request):
    user = request.user

    return Response({
        'id': user.id,
        'username': user.username,
    })

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def my_posts(request):
    posts = Post.objects.filter(user=request.user)
    serializer = PostSerializer(posts, many=True)

    return Response(serializer.data)