import { Navigate } from "react-router";
import { useAuth } from "../context/auth-context";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { currentUser, isGuest } = useAuth();

  if (!currentUser && !isGuest) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
