import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { User } from "../data/mock-data";

interface AuthContextType {
  currentUser: User | null;
  isGuest: boolean;
  login: (user: User) => void;
  logout: () => void;
  continueAsGuest: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isGuest, setIsGuest] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // ローカルストレージから認証情報を復元
    const savedUser = localStorage.getItem("currentUser");
    const savedIsGuest = localStorage.getItem("isGuest");
    
    if (savedIsGuest === "true") {
      setIsGuest(true);
    } else if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
    
    setIsLoading(false);
  }, []);

  const login = (user: User) => {
    setCurrentUser(user);
    setIsGuest(false);
    localStorage.setItem("currentUser", JSON.stringify(user));
    localStorage.removeItem("isGuest");
  };

  const logout = () => {
    setCurrentUser(null);
    setIsGuest(false);
    localStorage.removeItem("currentUser");
    localStorage.removeItem("isGuest");
  };

  const continueAsGuest = () => {
    setIsGuest(true);
    setCurrentUser(null);
    localStorage.setItem("isGuest", "true");
    localStorage.removeItem("currentUser");
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-teal-500 border-t-transparent mx-auto"></div>
          <p className="text-gray-600">読み込み中...</p>
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ currentUser, isGuest, login, logout, continueAsGuest }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
