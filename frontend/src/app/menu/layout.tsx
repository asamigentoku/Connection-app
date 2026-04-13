// app/layout.tsx（Next.js 13+ / appディレクトリ）
"use client"; // クライアントコンポーネントにする必要あり
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ReactNode, useState } from "react";
import { MessageSquare, Home, LogOut, UserCircle, User, Settings } from "lucide-react";
import { useAuthStore } from "../../lib/auth_context";//二つ上の階層を示す
import { SettingsModal } from "../../hooks/settings-modal";

interface RootLayoutProps {
    children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
    const { currentUser, isGuest, logout } = useAuthStore();
    const router = useRouter();
    const [showUserMenu, setShowUserMenu] = useState(false);
    const [showSettings, setShowSettings] = useState(false);

    const handleLogout = () => {
        logout();
        router.push("/login");
    };

    const handleSwitchUser = () => {
        logout();
        router.push("/login");
    };
// {showUserMenu && ( ... )} という構文は、条件付きレンダリングの一種で、showUserMenu が true のときだけ <div> 内の内容がレンダリングされます。これにより、ユーザーメニューが表示されるタイミングを制御できます。
    return (
        <div className="flex h-screen flex-col bg-gray-50">
        <header className="border-b border-gray-200 bg-gradient-to-r from-indigo-600 to-blue-600 shadow-sm">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
            <h1 className="text-2xl font-bold text-white">コミュニティボード</h1>
            <div className="flex items-center gap-4">
                <nav className="flex gap-2">
                <Link
                    href="/menu/board"
                    className="flex items-center gap-2 rounded-lg px-4 py-2 text-white hover:bg-white/10"
                >
                    <Home className="h-5 w-5" />
                    掲示板
                </Link>
                <Link
                    href="/menu/messages"
                    className="flex items-center gap-2 rounded-lg px-4 py-2 text-white hover:bg-white/10"
                >
                    <MessageSquare className="h-5 w-5" />
                    メッセージ
                </Link>
                </nav>

                <div className="relative">
                <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2 text-white hover:bg-white/20"
                >
                    {currentUser ? (
                    <>
                        <img
                        src={currentUser.iconUrl}
                        alt={currentUser.userName}
                        className="h-8 w-8 rounded-full object-cover"
                        />
                        <span className="hidden sm:inline">{currentUser.name}</span>
                    </>
                    ) : (
                    <>
                        <UserCircle className="h-8 w-8" />
                        <span className="hidden sm:inline">ゲスト</span>
                    </>
                    )}
                </button>
                {showUserMenu && (
                    <>
                    <div
                        className="fixed inset-0 z-10"
                        onClick={() => setShowUserMenu(false)}
                    />
                    <div className="absolute right-0 top-full mt-2 z-20 w-56 rounded-lg bg-white py-2 shadow-lg">
                        <div className="border-b border-gray-100 px-4 py-3">
                        <div className="font-medium text-gray-900">
                            {currentUser ? currentUser.userName : "ゲストユーザー"}
                        </div>
                        <div className="text-sm text-gray-500">
                            {isGuest ? "閲覧のみ可能" : currentUser?.status}
                        </div>
                        </div>
                        <button
                        onClick={() => {
                            setShowSettings(true);
                            setShowUserMenu(false);
                        }}
                        className="flex w-full items-center gap-3 px-4 py-2 text-left text-gray-700 hover:bg-gray-50"
                        >
                        <Settings className="h-4 w-4" />
                        安全設定
                        </button>
                        <button
                        onClick={handleSwitchUser}
                        className="flex w-full items-center gap-3 px-4 py-2 text-left text-gray-700 hover:bg-gray-50"
                        >
                        <User className="h-4 w-4" />
                        ユーザーを切り替え
                        </button>
                        <button
                        onClick={handleLogout}
                        className="flex w-full items-center gap-3 px-4 py-2 text-left text-red-600 hover:bg-red-50"
                        >
                        <LogOut className="h-4 w-4" />
                        ログアウト
                        </button>
                    </div>
                    </>
                )}
                </div>
            </div>
            </div>
        </header>
        <main className="flex-1 overflow-auto">{children}</main>
        <SettingsModal isOpen={showSettings} onClose={() => setShowSettings(false)} />
        </div>
    );
}