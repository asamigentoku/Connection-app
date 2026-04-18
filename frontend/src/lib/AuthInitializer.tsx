"use client";

import { useEffect } from "react";
import { useAuthStore } from "@lib/auth_context";

export default function AuthInitializer() {
    const { initializeAuth } = useAuthStore();

    useEffect(() => {
        initializeAuth();
    }, []);

    return null;
}