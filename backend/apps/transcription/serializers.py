from rest_framework import serializers
from .models import TranscriptionSession, TranscriptionSessionHistory

class TranscriptionSessionHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = TranscriptionSessionHistory
        fields = '__all__'

class TranscriptionSessionSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = TranscriptionSession
        fields = ['id', 'title', 'created_at']
