"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Send, ShieldAlert, CheckCircle } from "lucide-react";
import Link from "next/link";
import { api } from "@api/client";

export default function NewPostPage() {
    const router = useRouter();
    const [success, setSuccess] = useState(false);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            // 2. 問題なければ本投稿
            const result=await api.tweets.createPostTweetcreatePostPost({
                createPostModel: {
                    title: title,
                    content: content,
                }
            });
            if (result) {
                setSuccess(true);
                setTimeout(() => {
                    router.push("/menu/board");
                }, 2000); // 2秒後に遷移
            } // 一覧へ戻る
        } catch (err) {
            console.error(err);
            setError("投稿に失敗しました。時間をおいて再度お試しください。");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="mx-auto max-w-3xl p-6">
            <div className="mb-6">
                <Link href="/menu/board" className="flex items-center text-sm text-gray-500 hover:text-gray-800">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    掲示板に戻る
                </Link>
                <h2 className="mt-4 text-3xl font-bold text-gray-800">新規投稿</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                    <div className="flex items-center gap-2 rounded-lg bg-red-50 p-4 text-red-700">
                        <ShieldAlert className="h-5 w-5" />
                        <span className="text-sm">{error}</span>
                    </div>
                )}
                {success && (
                    <div className="flex items-center gap-2 rounded-lg bg-green-50 p-4 text-green-700">
                        <CheckCircle className="h-5 w-5" />
                        <span className="text-sm">投稿が正常に完了しました！掲示板に戻ります...</span>
                    </div>
                )}
                <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">タイトル</label>
                    <input
                        type="text"
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full rounded-lg border border-gray-300 p-3 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        placeholder="投稿のタイトルを入力"
                    />
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">内容</label>
                    <textarea
                        required
                        rows={6}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="w-full rounded-lg border border-gray-300 p-3 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        placeholder="どのような内容を共有しますか？"
                    />
                </div>

                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex items-center gap-2 rounded-lg bg-indigo-600 px-8 py-3 font-semibold text-white transition-all hover:bg-indigo-700 disabled:opacity-50"
                    >
                        {isSubmitting ? "送信中..." : <><Send className="h-4 w-4" /> 投稿する</>}
                    </button>
                </div>
            </form>
        </div>
    );
}