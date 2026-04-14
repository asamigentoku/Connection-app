"use client";

import Link from "next/link";
import { replies } from "@data/mock-data";
import { ArrowLeft, ThumbsUp, Clock, Send, Lock, CheckCircle } from "lucide-react";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { useState,useEffect } from "react";
import { useAuthStore } from "@lib/auth_context";
import {analyzebyPostId } from "@utils/content-moderation-post";
import { ContentCard } from "@hooks/content-card";
import {ReplyCard} from "@hooks/reply-card"
import {api} from "@api/client"
import * as React from 'react'
import {GetReplysTweetpostsReplyPostIdGetRequest} from "../../../../api";

interface ThreadPageProps {
    params: Promise<{ id: number }>;

}

export default function ThreadView({ params }: ThreadPageProps) {
    const { id } = React.use(params);
    const [users,setusers]=useState<any[]>([]);
    const [posts,setposts]=useState<any[]>([]);
    const [threadReplies, setThreadReplies] = useState<any[]>([]);
    const [moderationResult, setModerationResult] = useState<any>(null);
    const threadId:number=Number(id);
    const [replyText, setReplyText] = useState("");
    const { isGuest } = useAuthStore();
    useEffect(() => {
        const apiaccess = async () => {
            try {
                const posts = await api.tweets.getPostsTweetPostsGet();
                setposts(posts);

                const users = await api.users.getAllUserAllUserGet();
                setusers(users);

                const moderationresult=await analyzebyPostId(threadId);
                setModerationResult(moderationresult);

                const threadreplies= await api.tweets.getReplysTweetpostsReplyPostIdGet({postId:threadId});
                setThreadReplies(threadreplies);
            } catch (e) {
                console.error(e);
            }
        };
        apiaccess();
    }, []);
    console.log(moderationResult);
    const post = posts.find((p) => p.postId === threadId);

    if (!post) {
        return (
        <div className="flex h-full items-center justify-center">
            <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800">投稿が見つかりません</h2>

            <Link
                href="/menu/board"
                className="mt-4 inline-block text-indigo-600 hover:text-indigo-700"
            >
                掲示板に戻る
            </Link>
            </div>
        </div>
        );
    }

    const author = users.find((u) => u.id === post.authorId);
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setReplyText("");
    };

    return (
        <div className="mx-auto max-w-4xl p-6">

        <Link
            href="/menu/board"
            className="mb-6 inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700"
        >
            <ArrowLeft className="h-4 w-4" />
            掲示板に戻る
        </Link>

        <ContentCard moderationResult={moderationResult} author={author} className="p-0">

            <div className="mb-6 flex items-start gap-4">
            <img
                src={post.userIcon}
                alt={post.userName}
                className="h-14 w-14 rounded-full object-cover"
            />

            <div className="flex-1">
                <div className="flex items-center gap-2">
                <span className="font-semibold text-gray-900">
                    {post.userName}
                </span>

                {author?.isVerified && (
                    <CheckCircle className="h-5 w-5 text-blue-600" />
                )}
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-500">
                <Clock className="h-3.5 w-3.5" />
                {format(post.createdAt, "yyyy年MM月dd日 HH:mm", { locale: ja })}
                </div>
            </div>

            <button className="flex items-center gap-1.5 rounded-lg px-4 py-2 text-gray-600 hover:bg-gray-100">
                <ThumbsUp className="h-4 w-4" />
                <span>{post.likes}</span>
            </button>
            </div>

            <h1 className="mb-4 text-3xl font-bold text-gray-900">
            {post.title}
            </h1>

            <p className="mb-6 whitespace-pre-wrap text-gray-700 leading-relaxed">
            {post.content}
            </p>

        </ContentCard>

        <div className="mt-8">

            <h2 className="mb-4 text-xl font-bold text-gray-800">
            返信 ({threadReplies.length})
            </h2>

            <div className="space-y-4">
            {threadReplies.map((reply) => {
                const replyAuthor = users.find((u) => u.id === reply.authorId);
                return (
                <ReplyCard
                    key={reply.replyId}
                    className="p-0"
                >
                    <div className="mb-3 flex items-start gap-3">
                    <img
                        src={reply.userIcon}
                        alt={reply.userName}
                        className="h-10 w-10 rounded-full object-cover"
                    />

                    <div className="flex-1">
                        <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-900">
                            {reply.userName}
                        </span>

                        {replyAuthor?.isVerified && (
                            <CheckCircle className="h-4 w-4 text-blue-600" />
                        )}
                        </div>

                        <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Clock className="h-3.5 w-3.5" />
                        {format(reply.createdAt, "MM月dd日 HH:mm", { locale: ja })}
                        </div>
                    </div>

                    <button className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-indigo-600">
                        <ThumbsUp className="h-4 w-4" />
                    </button>
                    </div>

                    <p className="text-gray-700">{reply.content}</p>
                </ReplyCard>
                );
            })}
            </div>

            <form
            onSubmit={handleSubmit}
            className="mt-6 rounded-xl bg-white p-6 shadow-sm"
            >

            {isGuest && (
                <div className="mb-4 flex items-center gap-2 rounded-lg bg-yellow-50 border border-yellow-200 px-4 py-3 text-sm text-yellow-800">
                <Lock className="h-4 w-4" />
                ゲストユーザーは返信できません。ログインしてください。
                </div>
            )}

            <textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder={
                isGuest
                    ? "ゲストユーザーは返信できません"
                    : "返信を入力してください..."
                }
                className="w-full resize-none rounded-lg border border-gray-300 p-4 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 disabled:bg-gray-100"
                rows={4}
                disabled={isGuest}
            />

            <div className="mt-3 flex justify-end">
                <button
                type="submit"
                disabled={!replyText.trim() || isGuest}
                className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-indigo-600 to-blue-600 px-6 py-2 text-white shadow-md hover:shadow-lg disabled:opacity-50"
                >
                <Send className="h-4 w-4" />
                返信する
                </button>
            </div>

            </form>
        </div>
        </div>
    );
}