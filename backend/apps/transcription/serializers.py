from rest_framework import serializers
from .models import TranscriptionSession, TranscriptionSessionHistory

class TranscriptionSessionHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = TranscriptionSessionHistory
        fields = '__all__'

class TranscriptionSessionSerializer(serializers.ModelSerializer):
    history = TranscriptionSessionHistorySerializer(many=True, read_only=True)
    
    class Meta:
        model = TranscriptionSession
        fields = ['id', 'user', 'title', 'created_at', 'history']
        read_only_fields = ['user', 'created_at']
