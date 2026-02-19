"use client";

import React from "react";

interface Session {
    id: string;
    title: string;
    created_at: string;
}

interface HistorySidebarProps {
    sessions: Session[];
    activeSessionId: string | null;
    onSelectSession: (id: string) => void;
    onNewSession: () => void;
}

export const HistorySidebar: React.FC<HistorySidebarProps> = ({
    sessions,
    activeSessionId,
    onSelectSession,
    onNewSession,
}) => {
    return (
        <aside className="fixed left-0 top-0 hidden h-full w-64 flex-col border-r border-white/10 bg-zinc-950 p-4 sm:flex">
            <button
                onClick={onNewSession}
                className="mb-6 flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 py-2 px-3 text-sm font-medium transition-colors hover:bg-white/10 active:scale-[0.98]"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="h-4 w-4"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                New Transcript
            </button>

            <div className="flex-1 overflow-y-auto space-y-1">
                <h3 className="mb-2 px-2 text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
                    History
                </h3>
                {sessions.length === 0 ? (
                    <p className="px-2 text-xs text-zinc-600">No sessions yet</p>
                ) : (
                    sessions.map((session) => (
                        <button
                            key={session.id}
                            onClick={() => onSelectSession(session.id)}
                            className={`w-full rounded-lg px-3 py-2 text-left text-sm transition-all hover:bg-white/5 ${activeSessionId === session.id
                                ? "bg-white/10 text-white font-medium shadow-sm"
                                : "text-zinc-400"
                                }`}
                        >
                            <span className="block truncate">{session.title || "Untitled Session"}</span>
                            <span className="block text-[10px] opacity-40">
                                {new Date(session.created_at).toLocaleDateString()}
                            </span>
                        </button>
                    ))
                )}
            </div>

            <div className="mt-auto border-t border-white/10 pt-4">
                <div className="flex items-center gap-3 px-2">
                    <div className="h-8 w-8 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs font-bold ring-1 ring-blue-500/30">
                        D
                    </div>
                    <div className="flex-1 overflow-hidden">
                        <p className="truncate text-xs font-medium text-white">Demo User</p>
                        <p className="truncate text-[10px] text-zinc-500">Free Tier</p>
                    </div>
                </div>
            </div>
        </aside>
    );
};
