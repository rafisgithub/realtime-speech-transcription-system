"use client";

import { useState, useCallback } from "react";

export const useTranscription = () => {
    const [transcript, setTranscript] = useState("");
    const [partialTranscript, setPartialTranscript] = useState("");
    const [isRecording, setIsRecording] = useState(false);
    const [sessionId, setSessionId] = useState<string | null>(null);

    const connect = useCallback((onConnected: () => void) => {
        setIsRecording(true);
        setSessionId(Date.now().toString());
        onConnected();
    }, []);

    const sendAudio = useCallback((pcmData: any) => {
        // This would send data to WebSocket
        setPartialTranscript("...listening...");
    }, []);

    const disconnect = useCallback(() => {
        setIsRecording(false);
        setTranscript((prev) => prev + " " + partialTranscript);
        setPartialTranscript("");
        setSessionId(null);
    }, [partialTranscript]);

    return {
        transcript,
        partialTranscript,
        isRecording,
        sessionId,
        connect,
        sendAudio,
        disconnect,
        setTranscript,
    };
};
