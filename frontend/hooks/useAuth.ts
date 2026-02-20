"use client";

import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://127.0.0.1:8000";

interface User {
    id: number;
    email: string;
    avatar?: string;
    name?: string;
}

export const useAuth = () => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const api = axios.create({
        baseURL: API_BASE_URL,
        withCredentials: true,
    });

    const checkAuth = useCallback(async () => {
        try {
            const response = await api.post("/api/token/verify/");
            if (response.data.success) {
                setUser(response.data.data);
            } else {
                setUser(null);
            }
        } catch (error) {
            // Attempt refresh if verify fails
            try {
                const refreshResponse = await api.post("/api/token/refresh/");
                if (refreshResponse.data.success) {
                    // Refetch user data after refresh
                    const retryResponse = await api.post("/api/token/verify/");
                    setUser(retryResponse.data.data);
                } else {
                    setUser(null);
                }
            } catch (refreshError) {
                setUser(null);
            }
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    const loginWithGoogle = async (token: string) => {
        try {
            const response = await api.post("/api/google-auth/", {
                access_token: token,
            });
            if (response.data.success) {
                // The structure requested was data: { user: { ... } }
                setUser(response.data.data.user);
                return response.data;
            }
        } catch (error) {
            console.error("Google login failed", error);
            throw error;
        }
    };

    const logout = async () => {
        try {
            await api.post("/api/signout/");
        } catch (error) {
            console.error("Logout failed", error);
        } finally {
            setUser(null);
        }
    };

    return {
        user,
        loading,
        loginWithGoogle,
        logout,
        checkAuth,
    };
};
