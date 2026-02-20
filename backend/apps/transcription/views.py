from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from .models import TranscriptionSession, TranscriptionSessionHistory
from .serializers import TranscriptionSessionSerializer, TranscriptionSessionHistorySerializer

class StartSessionAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        title = request.data.get('title', '')
        session = TranscriptionSession.objects.create(user=request.user, title=title)
        serializer = TranscriptionSessionSerializer(session)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

class AllSessionAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        sessions = TranscriptionSession.objects.filter(user=request.user).order_by('-created_at')
        serializer = TranscriptionSessionSerializer(sessions, many=True)
        return Response(serializer.data)

class SessionHistoryAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        try:
            session = TranscriptionSession.objects.get(id=pk, user=request.user)
            history = session.history.all().order_by('start_time')
            serializer = TranscriptionSessionHistorySerializer(history, many=True)
            return Response(serializer.data)
        except TranscriptionSession.DoesNotExist:
            return Response({"error": "Session not found"}, status=status.HTTP_404_NOT_FOUND)
