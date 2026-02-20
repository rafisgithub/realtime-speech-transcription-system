"use client";

import React, { useState } from "react";
import { useAuth } from "@/hooks/useAuth";

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
    const { user, logout } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

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

            <div className="relative mt-auto border-t border-white/10 pt-4">
                {isMenuOpen && (
                    <div className="absolute bottom-full left-0 mb-2 w-full animate-in fade-in slide-in-from-bottom-2 rounded-xl border border-white/10 bg-zinc-900 p-1 shadow-2xl ring-1 ring-black/50">
                        <div className="px-3 py-2 border-b border-white/5 mb-1">
                            <p className="text-xs font-semibold text-white truncate">{user?.full_name || "Guest User"}</p>
                            <p className="text-[10px] text-zinc-500 truncate">{user?.email || "No email"}</p>
                        </div>
                        <button
                            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-zinc-400 transition-colors hover:bg-white/5 hover:text-white"
                            onClick={() => {
                                // Add profile view logic here if needed
                                console.log("Account Settings");
                            }}
                        >
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            Account settings
                        </button>
                        <button
                            onClick={logout}
                            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-red-400 transition-colors hover:bg-red-500/10"
                        >
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                            Log out
                        </button>
                    </div>
                )}

                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className={`flex w-full items-center gap-3 rounded-xl px-2 py-2 transition-all hover:bg-white/5 ${isMenuOpen ? 'bg-white/5' : ''}`}
                >
                    <div className="h-8 w-8 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs font-bold ring-1 ring-blue-500/30">
                        {user?.full_name?.charAt(0).toUpperCase() || "U"}
                    </div>
                    <div className="flex-1 text-left overflow-hidden">
                        <p className="truncate text-xs font-medium text-white">{user?.full_name || "Guest User"}</p>
                        <p className="truncate text-[10px] text-zinc-500">{user?.email || "Free Tier"}</p>
                    </div>
                    <svg
                        className={`h-4 w-4 text-zinc-500 transition-transform duration-200 ${isMenuOpen ? 'rotate-180' : ''}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
            </div>
        </aside>
    );
};
