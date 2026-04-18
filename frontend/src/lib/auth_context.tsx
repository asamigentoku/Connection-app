// stores/useAuthStore.ts
import { create } from "zustand";
import {UserResponse} from "@api/models"

interface AuthState {
    currentUser: UserResponse | null;
    accessToken: string | null;
    isGuest: boolean;
    login: (user: UserResponse,token:string) => void;
    logout: () => void;
    continueAsGuest: () => void;
    initializeAuth: () => void;
    selectedRoom: any | null;
    setSelectedRoom: (room: any) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    currentUser: null,
    accessToken: null,
    isGuest: false,
    selectedRoom:null,

    // ログイン、この関数を他で呼び出すことができる
    login: (user,token) => {
        localStorage.setItem("currentUser", JSON.stringify(user));
        localStorage.removeItem("isGuest");
        localStorage.setItem("accessToken", token);
        set({ currentUser: user,accessToken: token,isGuest: false });
    },

    // ログアウト
    logout: () => {
        localStorage.removeItem("currentUser");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("isGuest");
        set({ currentUser: null,accessToken:null, isGuest: false });
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
        const savedToken = localStorage.getItem("accessToken");
        const savedIsGuest = localStorage.getItem("isGuest");

        if (savedIsGuest === "true") {
        set({ currentUser: null, isGuest: true });
        } else if (savedUser) {
        set({ currentUser: JSON.parse(savedUser),accessToken: savedToken, isGuest: false });
        }
    },
    setSelectedRoom: (room) => set({ selectedRoom: room }),
}));
//使い方
//const { currentUser, isGuest } = useAuthStore();で現在の値を取得
//const { login, logout, continueAsGuest, initializeAuth } = useAuthStore();でアクションを呼び出す
