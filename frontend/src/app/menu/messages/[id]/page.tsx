"use client"; // クライアントコンポーネントとして扱う

import Link from "next/link";
import { useState,useEffect } from "react";
import { users, messages } from "@data/mock-data";
import { ArrowLeft, Send, Circle, Lock, CheckCircle } from "lucide-react";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { analyzeContent } from "@utils/content-moderation";
import * as React from 'react'
import { useAuthStore } from "@lib/auth_context"; // Zustand版
import { useSettingsStore } from "@lib/settings_context"; // Zustand版
import {api} from "@api/client"

interface ConversationViewProps {
    params: Promise<{ id: string }>;
}

export default function ConversationView({ params }: ConversationViewProps) {
    const { id } =React.use(params);
    const roomId=id
    const [messageText, setMessageText] = useState("");
    const { isGuest, currentUser,selectedRoom } = useAuthStore();
    const { showSentimentAnalysis, showModerationFlags } = useSettingsStore();
    const [conversationMessages,setConversationMessages]=useState<any[]>([]);
    useEffect(() => {
        if (!currentUser) return;
        const fetchUsers = async () => {
            try {
                const conversationMessages = await api.dm.readRoomTalkUserInformationRoomIdGet({roomId: roomId});
                setConversationMessages(conversationMessages);
            } catch (e) {
                console.error(e);
            }
        };

        fetchUsers();
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!messageText.trim() || isGuest) return;
        // モックデータなので送信は実際には行われません
        setMessageText("");
    };

    if (isGuest) {
        return (
        <div className="flex h-full items-center justify-center p-6">
            <div className="text-center">
            <Lock className="h-16 w-16 mx-auto mb-4 text-gray-400" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
                メッセージ機能は利用できません
            </h2>
            <p className="text-gray-600 mb-6">ゲストユーザーはメッセージを送受信できません。</p>
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

    if (!roomId) {
        return (
        <div className="flex h-full items-center justify-center">
            <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800">ユーザーが見つかりません</h2>
            <Link
                href="/menu/messages"
                className="mt-4 inline-block text-teal-600 hover:text-teal-700"
            >
                メッセージ一覧に戻る
            </Link>
            </div>
        </div>
        );
    }

    return (
        <div className="flex h-[calc(100vh-4rem)] flex-col">
        {/* Header */}
        <div className="border-b border-gray-200 bg-white px-6 py-4 shadow-sm">
            <div className="mx-auto flex max-w-4xl items-center gap-4">
            <Link
                href="/menu/messages"
                className="text-indigo-600 transition-colors hover:text-indigo-700"
            >
                <ArrowLeft className="h-5 w-5" />
            </Link>
            <img
                src={selectedRoom?.iconUrl || "/room_icon.png"}
                alt={selectedRoom?.name || "user"}
                className="h-10 w-10 rounded-full object-cover"
            />
            <div className="flex-1">
                <div className="flex items-center gap-2">
                <span className="font-semibold text-gray-900">{selectedRoom.name}</span>
                {currentUser.isVerified && <CheckCircle className="h-5 w-5 text-blue-600" />}
                </div>
                <div className="flex items-center gap-1.5 text-sm text-gray-500">
                {currentUser.isOnline ? (
                    <>
                    <Circle className="h-2 w-2 fill-emerald-500 text-emerald-500" />
                    オンライン
                    </>
                ) : (
                    <>
                    <Circle className="h-2 w-2 fill-gray-400 text-gray-400" />
                    オフライン
                    </>
                )}
                </div>
            </div>
            </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto bg-gray-50 p-6">
            <div className="mx-auto max-w-4xl space-y-4">
            {conversationMessages.map((message) => {
                const isSent = message.userId === currentUser.userId;
                const moderationResult = analyzeContent(message.content);
                return (
                <div key={message.id} className={`flex ${isSent ? "justify-end" : "justify-start"}`}>
                    <div className="flex max-w-[70%] items-end gap-2">
                    {!isSent && (
                        <img
                        src={message.userIcon}
                        alt={message.userName}
                        className="h-8 w-8 rounded-full object-cover"
                        />
                    )}
                    <div>
                        <div
                        className={`rounded-2xl px-4 py-2 ${
                            isSent
                            ? "bg-gradient-to-r from-indigo-600 to-blue-600 text-white"
                            : "bg-white text-gray-900"
                        }`}
                        >
                        <p>{message.content}</p>
                        </div>
                        {showModerationFlags && moderationResult.flags.length > 0 && (
                        <div className="mt-1 flex flex-wrap gap-1 px-2">
                            {moderationResult.flags.map((flag, index) => (
                            <span key={index} className="text-xs text-red-600">
                                ⚠️ {flag}
                            </span>
                            ))}
                        </div>
                        )}
                        {showSentimentAnalysis && moderationResult.sentiment !== "neutral" && !isSent && (
                        <div className="mt-1 px-2 text-xs text-gray-500">
                            {moderationResult.sentiment === "positive" && "😊"}
                            {moderationResult.sentiment === "negative" && "😢"}
                            {moderationResult.sentiment === "angry" && "😠"}
                        </div>
                        )}
                    </div>
                    <div
                        className={`mt-1 px-2 text-xs text-gray-500 ${
                        isSent ? "text-right" : "text-left"
                        }`}
                    >
                        {format(message.createdAt, "HH:mm", { locale: ja })}
                    </div>
                    </div>
                </div>
                );
            })}
            </div>
        </div>

        {/* Input */}
        <div className="border-t border-gray-200 bg-white p-4">
            <form onSubmit={handleSubmit} className="mx-auto flex max-w-4xl gap-3">
            <input
                type="text"
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                placeholder="メッセージを入力..."
                className="flex-1 rounded-full border border-gray-300 px-5 py-3 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
            <button
                type="submit"
                disabled={!messageText.trim()}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-md transition-all hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
            >
                <Send className="h-5 w-5" />
            </button>
            </form>
        </div>
        </div>
    );
}