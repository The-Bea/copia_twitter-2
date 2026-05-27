from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import Post, Comment
from .serializers import PostSerializer, CommentSerializer

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