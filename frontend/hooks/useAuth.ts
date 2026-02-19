"use client";

import { useState, useEffect } from "react";

export const useAuth = () => {
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const loginWithGoogle = async () => {
        // In a real app, this would trigger Google OAuth
        // Mocking for now as requested for the UI flow
        const mockUser = {
            id: "1",
            email: "user@example.com",
            name: "Rafi Ahmed",
            avatar: "https://ui-avatars.com/api/?name=Rafi+Ahmed&background=0D8ABC&color=fff",
        };
        localStorage.setItem("user", JSON.stringify(mockUser));
        setUser(mockUser);
    };

    const logout = () => {
        localStorage.removeItem("user");
        setUser(null);
    };

    return {
        user,
        loginWithGoogle,
        logout,
    };
};
