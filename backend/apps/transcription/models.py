from django.db import models
from django.conf import settings
import uuid

class TranscriptionSession(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='transcription_sessions')
    title = models.CharField(max_length=255, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Session {self.id} - {self.user.email}"


class TranscriptionSessionHistory(models.Model):
    session = models.ForeignKey(TranscriptionSession, on_delete=models.CASCADE, related_name='history')
    start_time = models.DateTimeField(auto_now_add=True)
    end_time = models.DateTimeField(null=True, blank=True)
    transcript = models.TextField(blank=True)
    duration = models.FloatField(default=0.0)
    word_count = models.IntegerField(default=0)
    

    def __str__(self):
        return f"History {self.id} - {self.session.user.email}"
