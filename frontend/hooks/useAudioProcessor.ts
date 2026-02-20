"use client";

import { useCallback } from "react";

export const useAudioProcessor = () => {
    const startRecording = useCallback((onData: (pcmData: any) => void) => {
        // In a real app, this would use Web Audio API to capture PCM
        console.log("Recording started");
    }, []);

    const stopRecording = useCallback(() => {
        console.log("Recording stopped");
    }, []);

    return {
        startRecording,
        stopRecording,
    };
};
