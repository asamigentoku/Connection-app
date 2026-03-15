// stores/useAuthStore.ts
import { create } from "zustand";
import { User } from "../data/mock-data";

interface AuthState {
    currentUser: User | null;
    isGuest: boolean;
    login: (user: User) => void;
    logout: () => void;
    continueAsGuest: () => void;
    initializeAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    currentUser: null,
    isGuest: false,

    // ログイン
    login: (user) => {
        localStorage.setItem("currentUser", JSON.stringify(user));
        localStorage.removeItem("isGuest");
        set({ currentUser: user, isGuest: false });
    },

    // ログアウト
    logout: () => {
        localStorage.removeItem("currentUser");
        localStorage.removeItem("isGuest");
        set({ currentUser: null, isGuest: false });
    },

    // ゲストとして続行
    continueAsGuest: () => {
        localStorage.setItem("isGuest", "true");
        localStorage.removeItem("currentUser");
        set({ currentUser: null, isGuest: true });
    },

    // ページロード時に localStorage から初期値を復元
    initializeAuth: () => {
        const savedUser = localStorage.getItem("currentUser");
        const savedIsGuest = localStorage.getItem("isGuest");

        if (savedIsGuest === "true") {
        set({ currentUser: null, isGuest: true });
        } else if (savedUser) {
        set({ currentUser: JSON.parse(savedUser), isGuest: false });
        }
    },
}));
//使い方
//const { currentUser, isGuest } = useAuthStore();で現在の値を取得
//const { login, logout, continueAsGuest, initializeAuth } = useAuthStore();でアクションを呼び出す
