from django.contrib.auth.models import User
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from users.models import Follow
from .models import Post, Comment
from .serializers import PostSerializer, CommentSerializer


# -----------------------------
# FEED (FOLLOW + PRÓPRIOS POSTS)
# -----------------------------
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def feed(request):
    user = request.user

    following_ids = Follow.objects.filter(
        follower=user
    ).values_list('following_id', flat=True)

    posts = Post.objects.filter(
        user_id__in=list(following_ids) + [user.id]
    ).order_by('-created_at')

    serializer = PostSerializer(posts, many=True)
    return Response(serializer.data)


# -----------------------------
# CRIAR POST
# -----------------------------
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_post(request):
    if not request.data.get('content'):
        return Response({'error': 'Conteúdo vazio'}, status=400)

    post = Post.objects.create(
        user=request.user,
        content=request.data['content']
    )

    serializer = PostSerializer(post)
    return Response(serializer.data)


# -----------------------------
# LIKE / UNLIKE
# -----------------------------
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def like_post(request, pk):
    try:
        post = Post.objects.get(id=pk)
    except Post.DoesNotExist:
        return Response({'error': 'Post não encontrado'}, status=404)

    if request.user in post.likes.all():
        post.likes.remove(request.user)
    else:
        post.likes.add(request.user)

    return Response({'likes': post.likes.count()})


# -----------------------------
# COMENTÁRIO
# -----------------------------
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_comment(request, pk):
    try:
        post = Post.objects.get(id=pk)
    except Post.DoesNotExist:
        return Response({'error': 'Post não encontrado'}, status=404)

    if not request.data.get('content'):
        return Response({'error': 'Comentário vazio'}, status=400)

    comment = Comment.objects.create(
        post=post,
        user=request.user,
        content=request.data['content']
    )

    serializer = CommentSerializer(comment)
    return Response(serializer.data)


# -----------------------------
# ME
# -----------------------------
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def me(request):
    user = request.user

    return Response({
        'id': user.id,
        'username': user.username,
        'bio': getattr(user.profile, 'bio', ''),
        'avatar': request.build_absolute_uri(user.profile.avatar.url) if user.profile.avatar else None
    })


# -----------------------------
# MEUS POSTS
# -----------------------------
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def my_posts(request):
    posts = Post.objects.filter(
        user=request.user
    ).order_by('-created_at')

    serializer = PostSerializer(posts, many=True)
    return Response(serializer.data)