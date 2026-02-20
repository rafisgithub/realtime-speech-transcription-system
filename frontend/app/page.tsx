"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useTranscription } from "@/hooks/useTranscription";
import { useAudioProcessor } from "@/hooks/useAudioProcessor";
import { LoginModal } from "@/components/LoginModal";
import { HistorySidebar } from "@/components/HistorySidebar";

export default function Home() {
  const { user, loading, loginWithGoogle } = useAuth();
  const {
    transcript,
    partialTranscript,
    isRecording,
    sessionId,
    connect,
    sendAudio,
    disconnect,
    setTranscript,
  } = useTranscription();
  const { startRecording, stopRecording } = useAudioProcessor();

  const [sessions, setSessions] = useState<{ id: string; title: string; created_at: string }[]>([]);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      fetchSessions();
    }
  }, [user]);

  const fetchSessions = async () => {
    try {
      // Mocked for UI demonstration
      setSessions([
        { id: "1", title: "Meeting with Client", created_at: new Date().toISOString() },
        { id: "2", title: "Lecture Notes", created_at: new Date().toISOString() },
      ]);
    } catch (err) {
      console.error("Failed to fetch sessions", err);
    }
  };

  const handleToggleRecording = async () => {
    if (isRecording) {
      stopRecording();
      disconnect();
    } else {
      setTranscript("");
      connect(() => {
        startRecording((pcmData: any) => {
          sendAudio(pcmData);
        });
      });
    }
  };

  const handleNewSession = () => {
    setActiveSessionId(null);
    setTranscript("");
    if (isRecording) {
      stopRecording();
      disconnect();
    }
  };

  const handleSelectSession = (id: string) => {
    setActiveSessionId(id);
    const selected = sessions.find((s) => s.id === id);
    if (selected) {
      setTranscript("This is a previously saved transcript for " + selected.title);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0d0d0d]">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#0d0d0d] text-[#ececec] selection:bg-blue-500/30">
      {!user && <LoginModal onLogin={(token) => loginWithGoogle(token)} />}

      <HistorySidebar
        sessions={sessions}
        activeSessionId={activeSessionId}
        onSelectSession={handleSelectSession}
        onNewSession={handleNewSession}
      />

      <main className="flex flex-1 flex-col sm:ml-64 relative">
        {/* Header */}
        <header className="sticky top-0 z-10 flex h-14 items-center justify-between border-b border-white/5 bg-[#0d0d0d]/80 px-4 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <button className="sm:hidden -ml-2 p-2 text-zinc-400 hover:text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div className="text-sm font-semibold tracking-tight text-white">
              {activeSessionId ? "Archive" : "Realtime Transcription"}
            </div>
          </div>
          <div className="flex items-center gap-3">
            {user && (
              <div className="flex items-center gap-2 px-2 py-1 rounded-full border border-white/5 bg-white/5">
                {user.avatar && <img src={user.avatar} className="w-5 h-5 rounded-full" alt="" />}
                <span className="text-xs font-medium text-zinc-300 hidden sm:inline">{user.name?.split(' ')[0]}</span>
              </div>
            )}
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto px-4 pb-48 pt-8">
          <div className="mx-auto max-w-2xl w-full">
            {(transcript || partialTranscript) ? (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
                <div className="bg-white/5 border border-white/10 rounded-3xl p-6 shadow-xl">
                  <p className="text-lg leading-relaxed whitespace-pre-wrap">
                    {transcript}
                    {partialTranscript && (
                      <span className="text-blue-400/80 animate-pulse transition-opacity duration-300">
                        {" "}{partialTranscript}
                      </span>
                    )}
                  </p>
                </div>
              </div>
            ) : (
              <div className="h-[60vh] flex flex-col items-center justify-center space-y-4">
                <div className="h-12 w-12 rounded-2xl bg-zinc-800 flex items-center justify-center border border-white/5">
                  <svg className="w-6 h-6 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                </div>
                <h2 className="text-zinc-500 font-medium tracking-tight">How can I help you transcribe today?</h2>
              </div>
            )}
          </div>
        </div>

        {/* Floating Input Bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#0d0d0d] via-[#0d0d0d] to-transparent pt-10 pb-8 px-4">
          <div className="mx-auto max-w-2xl relative">
            <div className={`
              relative flex items-center gap-3 p-1.5 transition-all duration-300 rounded-3xl border 
              ${isRecording
                ? 'bg-blue-500/10 border-blue-500/50 ring-4 ring-blue-500/5 shadow-[0_0_50px_-12px_rgba(59,130,246,0.25)]'
                : 'bg-[#1a1a1a] border-white/10 hover:border-white/20 shadow-2xl'
              }
            `}>
              <div className="flex-1 pl-4 text-sm text-zinc-400">
                {isRecording ? (
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse shadow-[0_0_8px_rgba(59,130,246,1)]" />
                    <span className="text-blue-400 font-medium tracking-wide">Transcribing audio...</span>
                  </div>
                ) : "Start speaking to transcribe..."}
              </div>

              <button
                onClick={handleToggleRecording}
                className={`
                  flex h-11 w-11 items-center justify-center rounded-2xl transition-all active:scale-95
                  ${isRecording
                    ? "bg-red-500 text-white hover:bg-red-600 shadow-lg shadow-red-500/20"
                    : "bg-blue-500 text-white hover:bg-blue-600 shadow-xl shadow-blue-500/30 hover:-translate-y-0.5"
                  }
                `}
              >
                {isRecording ? (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <rect x="6" y="6" width="12" height="12" rx="2" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
                  </svg>
                )}
              </button>
            </div>

            <div className="mt-3 flex justify-center gap-6 text-[11px] font-medium text-zinc-600 uppercase tracking-[0.1em]">
              <span className="hover:text-zinc-400 cursor-help transition-colors">Privacy</span>
              <span>•</span>
              <span className="hover:text-zinc-400 cursor-help transition-colors">Security</span>
              <span>•</span>
              <span className="hover:text-zinc-400 cursor-help transition-colors">v1.2.0</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
