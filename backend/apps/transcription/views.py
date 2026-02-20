from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from .models import TranscriptionSession, TranscriptionSessionHistory
from .serializers import TranscriptionSessionSerializer, TranscriptionSessionHistorySerializer
from apps.user.authentication import CookieJWTAuthentication
from django.utils import timezone
from apps.utils.helpers import success, error


class StartSessionAPIView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [CookieJWTAuthentication]

    def post(self, request):
        now = timezone.localtime()
        title = f"Session - {now.strftime('%d %b %Y, %I:%M %p')}"
        session = TranscriptionSession.objects.create(user=request.user, title=title)
        serializer = TranscriptionSessionSerializer(session)
        return success(data=serializer.data, message="Session started successfully.", status_code=status.HTTP_201_CREATED)

class AllSessionAPIView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [CookieJWTAuthentication]

    def get(self, request):
        sessions = TranscriptionSession.objects.filter(user=request.user).order_by('-created_at')
        serializer = TranscriptionSessionSerializer(sessions, many=True)
        return success(data=serializer.data, message="Sessions fetched successfully.", status_code=status.HTTP_200_OK)

class SessionHistoryAPIView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [CookieJWTAuthentication]

    def get(self, request, session_id):
        try:
            session = TranscriptionSession.objects.get(id=session_id, user=request.user)
            history = session.history.all().order_by('start_time')
            serializer = TranscriptionSessionHistorySerializer(history, many=True)
            return success(data=serializer.data, message="Session history fetched successfully.", status_code=status.HTTP_200_OK)
        except TranscriptionSession.DoesNotExist:
            return error(message="Session not found", status_code=status.HTTP_404_NOT_FOUND)
