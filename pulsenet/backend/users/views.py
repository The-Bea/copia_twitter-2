from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.contrib.auth.models import User
from .serializers import RegisterSerializer
from .models import Profile

@api_view(['POST'])
def register(request):
    serializer = RegisterSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)

    return Response(serializer.errors)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def follow_user(request, username):
    target = User.objects.get(username=username)

    profile = request.user.profile
    target_profile = target.profile

    if target_profile in profile.following.all():
        profile.following.remove(target_profile)
        return Response({'message': 'unfollow'})

    profile.following.add(target_profile)
    return Response({'message': 'follow'})