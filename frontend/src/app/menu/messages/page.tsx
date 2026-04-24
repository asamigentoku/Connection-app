"use client"; // クライアントコンポーネントとして扱う
import Link from "next/link";
import { users, conversations } from "@data/mock-data";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { Lock } from "lucide-react";
import { useState,useEffect } from "react";
import {api} from "@api/client"
import { useAuthStore } from "@lib/auth_context"; // Zustand版
//message current_user->rooms
//message/room_id

export default function Messages() {
    const { currentUser,isGuest,setSelectedRoom } = useAuthStore();
    const [roomsWithUsers, setRoomsWithUsers] = useState<any[]>([]);
    useEffect(() => {
        if (!currentUser) return;
        const fetchUsers = async () => {
            try {
                const rooms = await api.dm.getRoomsByUserTalkUserRoomsGet();
                const roomsWithUsers = await Promise.all(
                    rooms.map(async (room) => ({
                        ...room,
                        friend: await api.dm.readRoomTalkFriendInformationRoomIdGet({ roomId: room.roomId }),
                    }))
                );
                setRoomsWithUsers(roomsWithUsers);
            } catch (e) {
                console.error(e);
            }
        };

        fetchUsers();
    }, []);
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
            {roomsWithUsers.map((room) => {
                const friend = room.friend;
                console.log(friend)
                if (!room) return null;
                return (
                    <Link
                    key={room.roomId}
                    href={`/menu/messages/${room.roomId}`}
                    onClick={() => setSelectedRoom(room)}
                    className="flex items-center gap-4 border-b border-gray-100 p-5 transition-colors hover:bg-gray-50 last:border-b-0"
                    >
                    <div className="relative">
                        <img
                        src={room.roomIcon || friend?.iconUrl}
                        alt={room.roomName || friend?.userName}
                        className="h-14 w-14 rounded-full object-cover"
                        />
                        {/*{user.isOnline && (*/}
                        {/*<div className="absolute bottom-0 right-0 h-4 w-4 rounded-full border-2 border-white bg-emerald-500" />*/}
                        {/*)}*/}
                    </div>

                    <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold text-gray-900">{room.roomName || friend?.userName}</h3>
                        {/*<span className="text-xs text-gray-500">*/}
                        {/*    {format(conversation.lastMessageTime, "MM/dd HH:mm", { locale: ja })}*/}
                        {/*</span>*/}
                        </div>
                        {/*<p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>*/}
                    </div>

                    {room.unreadCount > 0 && (
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 text-xs font-medium text-white">
                        {room.unreadCount}
                        </div>
                    )}
                    </Link>
                );
                })}

            {roomsWithUsers.length === 0 && (
            <div className="p-12 text-center text-gray-500">
                メッセージはまだありません
            </div>
            )}
        </div>
        </div>
    );
}