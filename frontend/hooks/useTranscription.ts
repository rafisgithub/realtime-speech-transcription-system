import { useState, useCallback, useRef } from "react";

const WS_BASE_URL = process.env.NEXT_PUBLIC_WS_URL || "ws://127.0.0.1:8000";

export const useTranscription = () => {
    const [transcript, setTranscript] = useState("");
    const [partialTranscript, setPartialTranscript] = useState("");
    const [isRecording, setIsRecording] = useState(false);
    const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
    const socketRef = useRef<WebSocket | null>(null);

    const connect = useCallback((sessionId: string, onConnected: () => void) => {
        const url = `${WS_BASE_URL}/ws/transcribe/?session_id=${sessionId}`;
        const socket = new WebSocket(url);
        socketRef.current = socket;
        setActiveSessionId(sessionId);

        socket.onopen = () => {
            console.log("WebSocket connected");
            setIsRecording(true);
            onConnected();
        };

        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.type === "partial") {
                setPartialTranscript(data.text);
            } else if (data.type === "final") {
                setTranscript((prev) => prev + (prev ? " " : "") + data.text);
                setPartialTranscript("");
            } else if (data.error) {
                console.error("WebSocket error message:", data.error);
            }
        };

        socket.onclose = () => {
            console.log("WebSocket closed");
            setIsRecording(false);
            setPartialTranscript("");
        };

        socket.onerror = (error) => {
            console.error("WebSocket error:", error);
        };
    }, []);

    const sendAudio = useCallback((pcmData: Int16Array) => {
        if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
            socketRef.current.send(pcmData.buffer);
        }
    }, []);

    const disconnect = useCallback(() => {
        if (socketRef.current) {
            socketRef.current.close();
            socketRef.current = null;
        }
        setIsRecording(false);
        setPartialTranscript("");
    }, []);

    return {
        transcript,
        partialTranscript,
        isRecording,
        sessionId: activeSessionId,
        connect,
        sendAudio,
        disconnect,
        setTranscript,
    };
};
