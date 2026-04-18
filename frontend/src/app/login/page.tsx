"use client";

import { useState,useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@lib/auth_context";
import { UserCircle, LogIn } from "lucide-react";
import {api} from "@api/client"

export default function LoginPage() {
    const router = useRouter();
    const [ifinput, setIfinput] = useState<boolean>(false);
    const [input_username, setUsername] = useState<string>("");
    const [input_password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");
    const if_login_ok = input_password === "" || input_username === ""
    //グローバルの関数を定義
    const { login, continueAsGuest } = useAuthStore();
    //ここで選ばれたユーザーを選択
    const [selectedUserId, setSelectedUserId] = useState<string>("");

    const [users, setUsers] = useState<any[]>([]);
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await api.users.getAllUserAllUserGet();
                console.log(res); // ←ここが本体
                setUsers(res);
                console.log("response:", res);
                console.log("data:", res);
            } catch (e) {
                console.error(e);
            }
        };

        fetchUsers();
    }, []);

    const handleLogin = async () => {
        const user = users.find((u) => u.userId === selectedUserId);
        if (ifinput) {
            try {
                const data = await api.jwt.loginForAccessTokenLoginPost({
                    username: user.userName,
                    password: "password",
                });
                login(user, data.accessToken);
                router.push("/menu/board");
            } catch (e) {
                setError("ログインに失敗しました。もう一度お試しください。");
            }
            return;
        }

        if (user) {
            const data = await api.jwt.loginForAccessTokenLoginPost({
                username: user.userName,
                password: "password",
            });
            login(user,data.accessToken);
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
            <button
                onClick={() => setIfinput(!ifinput)}
                className="mb-4 w-full text-sm text-indigo-600 hover:text-indigo-800 transition-all"
            >
                {ifinput ? "ユーザー一覧から選ぶ" : "ユーザー名・パスワードで入力する"}
            </button>
            {error && (
                <p className="mb-3 text-sm text-red-600 text-center">{error}</p>
            )}

            <div className="rounded-2xl bg-white p-8 shadow-lg">
            <div className="mb-6">
                {ifinput ?(
                    <>
                        <label className="mb-3 block text-sm font-medium text-gray-700">
                            ユーザー名
                        </label>
                        <input
                            type="text"
                            value={input_username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="ユーザー名を入力"
                            className="mb-4 w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-gray-900 focus:border-indigo-600 focus:outline-none transition-all"
                        />
                        <label className="mb-3 block text-sm font-medium text-gray-700">
                            パスワード
                        </label>
                        <input
                            type="password"
                            value={input_password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="パスワードを入力"
                            className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-gray-900 focus:border-indigo-600 focus:outline-none transition-all"
                        />
                    </>
                ):(
                    <>
                        <label className="mb-3 block text-sm font-medium text-gray-700">
                            ユーザーを選択
                        </label>
                        <div className="space-y-2">
                            {users.slice(0, 3).map((user) => (
                                <button
                                    key={user.userId}
                                    onClick={() => setSelectedUserId(user.userId)}
                                    className={`flex w-full items-center gap-3 rounded-xl border-2 p-4 transition-all ${
                                        selectedUserId === user.userId
                                            ? "border-indigo-600 bg-indigo-50"
                                            : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                                    }`}
                                >
                                    <img
                                        src={user.iconUrl}
                                        alt={user.userName}
                                        className="h-12 w-12 rounded-full object-cover"
                                    />
                                    <div className="flex-1 text-left">
                                        <div className="font-semibold text-gray-900">{user.userName}</div>
                                        <div className="text-sm text-gray-500">{user.status}</div>
                                    </div>
                                    {selectedUserId === user.userId && (
                                        <div className="h-5 w-5 rounded-full bg-indigo-600 flex items-center justify-center">
                                            <div className="h-2 w-2 rounded-full bg-white"></div>
                                        </div>
                                    )}
                                </button>
                            ))}
                        </div>
                    </>
                )}
            </div>
            <button
                onClick={handleLogin}
                disabled={ifinput ? if_login_ok : !selectedUserId}
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