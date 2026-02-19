"use client";

import React from "react";

interface LoginModalProps {
    onLogin: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ onLogin }) => {
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md animate-in fade-in duration-500">
            <div className="w-full max-w-sm p-8 bg-zinc-900 border border-white/10 rounded-3xl shadow-2xl space-y-8 animate-in zoom-in-95 slide-in-from-bottom-4 duration-500">
                <div className="text-center space-y-3">
                    <div className="mx-auto h-12 w-12 rounded-2xl bg-blue-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
                        <svg
                            className="w-7 h-7 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09a2.03 2.03 0 00-.15-1.947m1.613-2.158a1.914 1.914 0 012.907 1.015l.07.351a2.01 2.01 0 01-1.259 2.227m1.259-2.227A2.01 2.01 0 0011 19.34s-.485.495-1.332.495c-.847 0-1.332-.495-1.332-.495a2.01 2.01 0 011.259-2.227m1.259 2.227l.07.351a1.914 1.914 0 01-2.907-1.015m2.907 1.015L11 19.34m-3.44 2.04a2.01 2.01 0 011.259-2.227m-1.259 2.227c-.847 0-1.332-.495-1.332-.495a2.01 2.01 0 011.259-2.227"
                            />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold tracking-tight text-white">Welcome back</h2>
                    <p className="text-zinc-400 text-sm">Sign in to start transcribing your ideas.</p>
                </div>

                <button
                    onClick={onLogin}
                    className="w-full flex items-center justify-center gap-3 px-4 py-3.5 bg-white hover:bg-zinc-200 text-black font-semibold rounded-2xl transition-all active:scale-[0.98] group"
                >
                    <svg className="w-5 h-5 transition-transform group-hover:scale-110" viewBox="0 0 24 24">
                        <path
                            fill="currentColor"
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                            fill="currentColor"
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                            fill="currentColor"
                            d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.84z"
                        />
                        <path
                            fill="currentColor"
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                        />
                    </svg>
                    Continue with Google
                </button>

                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-white/5"></span>
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-zinc-900 px-2 text-zinc-500 font-medium">Coming soon</span>
                    </div>
                </div>

                <button className="w-full py-2.5 text-sm text-zinc-400 font-medium hover:text-white transition-colors">
                    Other sign in methods
                </button>

                <p className="text-center text-[10px] text-zinc-600 leading-relaxed">
                    By continuing, you agree to our <span className="underline cursor-pointer">Terms</span> and{" "}
                    <span className="underline cursor-pointer">Privacy Policy</span>.
                </p>
            </div>
        </div>
    );
};
