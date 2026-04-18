"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { CheckCircle, Search, UserX, MessageCircle, Users } from "lucide-react";
import { useAuthStore } from "@lib/auth_context";
import { api } from "@api/client";

export default function FriendsList() {
    const [friends, setFriends] = useState<any[]>([]);
    const [searchText, setSearchText] = useState("");
    const [loading, setLoading] = useState(true);

    const { currentUser } = useAuthStore();

    useEffect(() => {
        const fetchFriends = async () => {
            if (!currentUser?.userId) return;
            try {
                console.log("Fetching friends for user ID:", currentUser.userId);
                const data = await api.friends.getFriendsListFriendsFriendsListUserIdGet({userId:currentUser.userId});
                console.log(data)
                setFriends(data);
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        };

        fetchFriends();
    }, [currentUser?.userId]);

    const filteredFriends = friends.filter((friend) =>
        friend.userName?.includes(searchText)
    );

    // コンポーネントの外に追加
    const avatarColors = [
        "from-indigo-400 to-purple-500",
        "from-pink-400 to-rose-500",
        "from-emerald-400 to-teal-500",
        "from-orange-400 to-amber-500",
        "from-sky-400 to-blue-500",
    ];

    const getInitials = (name: string) => {
        return name?.charAt(0)?.toUpperCase() ?? "?";
    };

    const getStatusColor = (isOnline: boolean) => {
        return isOnline ? "bg-emerald-400" : "bg-gray-300";
    };


    return (
        <div className="mx-auto max-w-5xl p-6">
            {/* Header */}
            <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <h2 className="text-3xl font-bold text-gray-800">友達一覧</h2>
                    <span className="rounded-full bg-indigo-100 px-3 py-1 text-sm font-medium text-indigo-700">
                        {friends.length}人
                    </span>
                </div>

            </div>


            <div className="mb-6">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        placeholder="名前やメールアドレスで検索..."
                        className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                </div>
            </div>

            <div className="space-y-3">
                {filteredFriends.map((friend, index) => (
                    <div
                        key={friend.userId}
                        className="group rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all hover:border-indigo-100 hover:shadow-md"
                    >
                        <div className="flex items-center justify-between">
                            {/* Left: Avatar + Info */}
                            <Link
                                href={`/menu/profile/${friend.userId}`}
                                className="flex items-center gap-4"
                            >
                                <div className="relative">
                                    {friend.iconUrl ? (
                                        <img
                                            src={friend.iconUrl}
                                            alt={friend.userName}
                                            className="h-14 w-14 rounded-full object-cover"
                                        />
                                    ) : (
                                        <div
                                            className={`flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br text-white font-semibold text-lg ${
                                                avatarColors[index % avatarColors.length]
                                            }`}
                                        >
                                            {getInitials(friend.userName)}
                                        </div>
                                    )}
                                    {/* Online indicator */}
                                    <span
                                        className={`absolute bottom-0.5 right-0.5 h-3 w-3 rounded-full border-2 border-white ${getStatusColor(friend.is_online)}`}
                                    />
                                </div>

                                <div>
                                    <div className="flex items-center gap-2">
                                            <span className="font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                                                {friend.userName}
                                            </span>
                                        {friend.isVerified && (
                                            <CheckCircle className="h-4 w-4 text-blue-600" />
                                        )}
                                    </div>



                                    <div className="mt-1 flex items-center gap-3 text-xs text-gray-400">
                                        {friend.isOnline ? (
                                            <span className="text-emerald-500 font-medium">オンライン</span>
                                        ) : (
                                            <span>オフライン</span>
                                        )}

                                    </div>
                                </div>
                            </Link>

                            {/* Right: Actions */}
                            <div className="flex items-center gap-2">
                                <Link
                                    href={`/menu/messages/${friend.user_id}`}
                                    className="flex items-center gap-1.5 rounded-lg bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-600 transition hover:bg-indigo-100"
                                >
                                    <MessageCircle className="h-4 w-4" />
                                    <span>メッセージ</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>


        </div>
    );
}
