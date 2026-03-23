"use client";

import Link from "next/link";
import { users, posts } from "@data/mock-data";
import { MessageCircle, ThumbsUp, Clock, Lock, CheckCircle } from "lucide-react";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { useAuthStore } from "@lib/auth_context";
import { analyzeContent } from "@utils/content-moderation";
import { ContentCard } from "@hooks/content-card";

export default function BulletinBoard() {
    const { isGuest } = useAuthStore();
    const getCategoryColor = (category: string) => {
        const colors: Record<string, string> = {
        お知らせ: "bg-blue-100 text-blue-700",
        雑談: "bg-purple-100 text-purple-700",
        技術: "bg-emerald-100 text-emererd-700",
        イベント: "bg-orange-100 text-orange-700",
        健康: "bg-pink-100 text-pink-700",
        };
        return colors[category] || "bg-gray-100 text-gray-700";
    };
    return (
        <div className="mx-auto max-w-5xl p-6">
        <div className="mb-6 flex items-center justify-between">
            <h2 className="text-3xl font-bold text-gray-800">掲示板</h2>

            {isGuest ? (
            <div className="flex items-center gap-2 rounded-lg bg-gray-100 px-4 py-2 text-gray-600">
                <Lock className="h-4 w-4" />
                <span className="text-sm">ゲストユーザーは閲覧のみ</span>
            </div>
            ) : (
            <button className="rounded-lg bg-gradient-to-r from-indigo-600 to-blue-600 px-6 py-2 text-white shadow-md transition-all hover:shadow-lg">
                新規投稿
            </button>
            )}
        </div>

        <div className="space-y-4">
            {posts.map((post) => {
                //ここのmapで複数表示している
                //ここでAPIを叩いているようなものpost一覧を取得してその後に
                //そのpostのuser_idからその投稿について取得などを行う
            const author = users.find((u) => u.id === post.authorId);
            const moderationResult = analyzeContent(post.title + " " + post.content);

            return (
                <ContentCard
                key={post.id}
                moderationResult={moderationResult}
                author={author}
                >
                <Link href={`/menu/thread/${post.id}`} className="block">
                    <div className="mb-3 flex items-start justify-between">
                    <div className="flex items-center gap-3">
                        <img
                        src={author?.avatar}
                        alt={author?.name}
                        className="h-12 w-12 rounded-full object-cover"
                        />

                        <div>
                        <div className="flex items-center gap-2">
                            <span className="font-medium text-gray-900">
                            {author?.name}
                            </span>

                            {author?.isVerified && (
                            <CheckCircle className="h-4 w-4 text-blue-600" />
                            )}
                        </div>

                        <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Clock className="h-3.5 w-3.5" />
                            {format(post.createdAt, "MM月dd日 HH:mm", {
                            locale: ja,
                            })}
                        </div>
                        </div>
                    </div>

                    <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${getCategoryColor(
                        post.category
                        )}`}
                    >
                        {post.category}
                    </span>
                    </div>

                    <h3 className="mb-2 text-xl font-semibold text-gray-900">
                    {post.title}
                    </h3>

                    <p className="mb-4 text-gray-600 line-clamp-2">
                    {post.content}
                    </p>

                    <div className="flex items-center gap-6 text-sm text-gray-500">
                    <div className="flex items-center gap-1.5">
                        <MessageCircle className="h-4 w-4" />
                        <span>{post.replies} 件の返信</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                        <ThumbsUp className="h-4 w-4" />
                        <span>{post.likes}</span>
                    </div>
                    </div>
                </Link>
                </ContentCard>
            );
            }
            )}
        </div>
        </div>
    );
}