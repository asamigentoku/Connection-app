import { useRouter } from "next/router";
import {ReactNode, useEffect, useState} from "react";
import { useAuthStore } from "../lib/auth_context";

interface ProtectedRouteProps {
  children: ReactNode; // 内側に表示したいページコンテンツ
}
export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { currentUser, isGuest } = useAuthStore()
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token && !isGuest) {
      router.push("/login"); // ログインしていなければ /login へ
    } else {
      setIsLoggedIn(true);
    }
  }, [router]);

  if (!isLoggedIn) return <p>Checking login...</p>;

  return <>{children}</>; // ログイン済みなら中身を表示
}
