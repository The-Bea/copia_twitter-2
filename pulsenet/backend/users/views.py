from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.contrib.auth.models import User
from .serializers import RegisterSerializer
from .models import Profile
from .models import Follow
from posts.models import Post

@api_view(['POST'])
def register(request):
    serializer = RegisterSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)

    return Response(serializer.errors)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def follow_user(request, user_id):
    target = User.objects.get(id=user_id)

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