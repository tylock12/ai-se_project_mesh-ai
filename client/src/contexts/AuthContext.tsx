// src/contexts/AuthContext.tsx
import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { CurrentUser } from "../types";
import { getCurrentUser } from "../utils/api";

type AuthContextValue = {
  currentUser: CurrentUser | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  login: (token: string, user: CurrentUser) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Restore the session on mount if a token is saved
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsLoading(false);
      return;
    }

    let cancelled = false;

    const restoreSession = async () => {
      try {
        const user = await getCurrentUser();
        if (!cancelled) setCurrentUser(user);
      } catch {
        localStorage.removeItem("token");
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    restoreSession();

    return () => {
      cancelled = true;
    };
  }, []);

  const login = (token: string, user: CurrentUser) => {
    localStorage.setItem("token", token);
    setCurrentUser(user);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setCurrentUser(null);
  };

  const value: AuthContextValue = {
    currentUser,
    isLoggedIn: currentUser !== null,
    isLoading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside an AuthProvider");
  }
  return context;
}