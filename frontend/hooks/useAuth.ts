"use client";

import { useState, useEffect, useCallback } from "react";
import api from "@/lib/api";

interface User {
    user_id: number;
    email: string;
    full_name: string;
    avatar?: string;
}

export const useAuth = () => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchProfile = async () => {
        try {
            const response = await api.get("/api/get-profile/");
            if (response.data.success) {
                setUser(response.data.data);
            }
        } catch (error) {
            console.error("Failed to fetch profile", error);
        }
    };

    const checkAuth = useCallback(async () => {
        try {
            const response = await api.post("/api/token/verify/");
            if (response.data.success) {
                await fetchProfile();
            } else {
                setUser(null);
            }
        } catch (error) {
            // Attempt refresh if verify fails
            try {
                const refreshResponse = await api.post("/api/token/refresh/");
                if (refreshResponse.data.success) {
                    await fetchProfile();
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
                // Fetch full profile after successful Google auth
                await fetchProfile();
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
            // Full page reload to clear any remaining state and redirect
            window.location.href = "/";
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
