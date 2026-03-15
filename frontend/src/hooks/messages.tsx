"use client"; // クライアントコンポーネントとして扱う
import Link from "next/link";
import { users, conversations } from "../data/mock-data";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { Lock } from "lucide-react";
import { useAuthStore } from "@lib/auth_context"; // Zustand版

export function Messages() {
    const { isGuest } = useAuthStore();

    if (isGuest) {
        return (
        <div className="mx-auto max-w-4xl p-6">
            <h2 className="mb-6 text-3xl font-bold text-gray-800">メッセージ</h2>
            <div className="rounded-xl bg-white p-12 shadow-sm text-center">
            <Lock className="h-16 w-16 mx-auto mb-4 text-gray-400" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                メッセージ機能は利用できません
            </h3>
            <p className="text-gray-600 mb-6">
                メッセージを送受信するには、ログインが必要です。
            </p>
            <Link
                href="/login"
                className="inline-block rounded-lg bg-gradient-to-r from-indigo-600 to-blue-600 px-6 py-3 text-white shadow-md transition-all hover:shadow-lg"
            >
                ログインする
            </Link>
            </div>
        </div>
        );
    }

    return (
        <div className="mx-auto max-w-4xl p-6">
        <h2 className="mb-6 text-3xl font-bold text-gray-800">メッセージ</h2>

        <div className="rounded-xl bg-white shadow-sm">
            {conversations.map((conversation) => {
            const user = users.find((u) => u.id === conversation.userId);
            if (!user) return null;

            return (
                <Link
                key={conversation.userId}
                href={`/menu/messages/${conversation.userId}`}
                className="flex items-center gap-4 border-b border-gray-100 p-5 transition-colors hover:bg-gray-50 last:border-b-0"
                >
                <div className="relative">
                    <img
                    src={user.avatar}
                    alt={user.name}
                    className="h-14 w-14 rounded-full object-cover"
                    />
                    {user.isOnline && (
                    <div className="absolute bottom-0 right-0 h-4 w-4 rounded-full border-2 border-white bg-emerald-500" />
                    )}
                </div>

                <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-gray-900">{user.name}</h3>
                    <span className="text-xs text-gray-500">
                        {format(conversation.lastMessageTime, "MM/dd HH:mm", { locale: ja })}
                    </span>
                    </div>
                    <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
                </div>

                {conversation.unreadCount > 0 && (
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 text-xs font-medium text-white">
                    {conversation.unreadCount}
                    </div>
                )}
                </Link>
            );
            })}

            {conversations.length === 0 && (
            <div className="p-12 text-center text-gray-500">
                メッセージはまだありません
            </div>
            )}
        </div>
        </div>
    );
}