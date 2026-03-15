"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { users } from "@data/mock-data";
import { useAuthStore } from "@lib/auth_context";
import { UserCircle, LogIn } from "lucide-react";

export default function LoginPage() {
    const router = useRouter();
    const { login, continueAsGuest } = useAuthStore();
    const [selectedUserId, setSelectedUserId] = useState<string>("");

    const handleLogin = () => {
        if (!selectedUserId) return;
        const user = users.find((u) => u.id === selectedUserId);
        if (user) {
        login(user);
        router.push("/menu/board");
        }
    };

    const handleGuestLogin = () => {
        continueAsGuest();
        router.push("menu/board");
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-50 p-4">
        <div className="w-full max-w-md">
            <div className="mb-8 text-center">
            <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-indigo-600 to-blue-600">
                <UserCircle className="h-10 w-10 text-white" />
            </div>
            <h1 className="mb-2 text-3xl font-bold text-gray-900">コミュニティボード</h1>
            <p className="text-gray-600">アカウントを選択してログイン</p>
            </div>

            <div className="rounded-2xl bg-white p-8 shadow-lg">
            <div className="mb-6">
                <label className="mb-3 block text-sm font-medium text-gray-700">
                ユーザーを選択
                </label>
                <div className="space-y-2">
                {users.map((user) => (
                    <button
                    key={user.id}
                    onClick={() => setSelectedUserId(user.id)}
                    className={`flex w-full items-center gap-3 rounded-xl border-2 p-4 transition-all ${
                        selectedUserId === user.id
                        ? "border-indigo-600 bg-indigo-50"
                        : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                    }`}
                    >
                    <img
                        src={user.avatar}
                        alt={user.name}
                        className="h-12 w-12 rounded-full object-cover"
                    />
                    <div className="flex-1 text-left">
                        <div className="font-semibold text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.status}</div>
                    </div>
                    {selectedUserId === user.id && (
                        <div className="h-5 w-5 rounded-full bg-indigo-600 flex items-center justify-center">
                        <div className="h-2 w-2 rounded-full bg-white"></div>
                        </div>
                    )}
                    </button>
                ))}
                </div>
            </div>

            <button
                onClick={handleLogin}
                disabled={!selectedUserId}
                className="mb-3 flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-indigo-600 to-blue-600 px-6 py-3 font-medium text-white shadow-md transition-all hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
            >
                <LogIn className="h-5 w-5" />
                ログイン
            </button>

            <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                <span className="bg-white px-4 text-gray-500">または</span>
                </div>
            </div>

            <button
                onClick={handleGuestLogin}
                className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-gray-300 px-6 py-3 font-medium text-gray-700 transition-all hover:bg-gray-50"
            >
                <UserCircle className="h-5 w-5" />
                ゲストとして続ける
            </button>
            </div>

            <p className="mt-6 text-center text-sm text-gray-600">
            ゲストユーザーは閲覧のみ可能です
            </p>
        </div>
        </div>
    );
}