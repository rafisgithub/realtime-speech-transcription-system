import json
import os
import time
from channels.generic.websocket import WebsocketConsumer
from django.conf import settings
from django.utils import timezone
from vosk import Model, KaldiRecognizer
from .models import TranscriptionSession, TranscriptionSessionHistory

class TranscriptionConsumer(WebsocketConsumer):
    def connect(self):
        self.user = self.scope.get("user")
        if not self.user or not self.user.is_authenticated:
            self.close()
            return

        self.accept()
        
        # Initialize Vosk
        model_path = settings.VOSK_MODEL_PATH
        if not os.path.exists(model_path):
            self.send(text_data=json.dumps({
                "error": f"Vosk model not found at {model_path}. Please download it."
            }))
            self.close()
            return
            
        self.model = Model(model_path)
        self.rec = KaldiRecognizer(self.model, 16000)
        
        # Check if we should join an existing session or create a new one
        # For now, always create a new one if not specified
        query_params = self.scope.get("query_string", b"").decode()
        session_id = None
        if "session_id=" in query_params:
            session_id = query_params.split("session_id=")[1].split("&")[0]

        if session_id:
            try:
                self.session = TranscriptionSession.objects.get(id=session_id, user=self.user)
            except TranscriptionSession.DoesNotExist:
                self.session = TranscriptionSession.objects.create(user=self.user)
        else:
            self.session = TranscriptionSession.objects.create(user=self.user)
            
        self.start_timestamp = time.time()
        self.current_segment_start = time.time()

    def disconnect(self, close_code):
        pass

    def receive(self, text_data=None, bytes_data=None):
        if bytes_data:
            if self.rec.AcceptWaveform(bytes_data):
                result = json.loads(self.rec.Result())
                text = result.get("text", "")
                if text:
                    end_time = timezone.now()
                    duration = time.time() - self.current_segment_start
                    word_count = len(text.split())
                    
                    # Create history entry
                    TranscriptionSessionHistory.objects.create(
                        session=self.session,
                        transcript=text,
                        duration=duration,
                        word_count=word_count,
                        end_time=end_time
                    )
                    
                    # Auto-generate title if empty
                    if not self.session.title:
                        self.session.title = (text[:50] + '...') if len(text) > 50 else text
                        self.session.save()

                    self.send(text_data=json.dumps({
                        "type": "final",
                        "text": text,
                        "session_id": str(self.session.id)
                    }))
                    self.current_segment_start = time.time()
            else:
                partial = json.loads(self.rec.PartialResult())
                self.send(text_data=json.dumps({
                    "type": "partial",
                    "text": partial.get("partial", "")
                }))
        elif text_data:
            pass
