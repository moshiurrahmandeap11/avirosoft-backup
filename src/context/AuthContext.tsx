"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import apiClient from "../components/shared/Axios/AxiosInstance";

// ─── Types ─────────────────────────────────────────────
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  profilePicture?: string | null;
  status: string;
  emailVerified: boolean;
  needPasswordChange: boolean;
  phone?: string | null;
  createdAt: string;
  updatedAt: string;
  [key: string]: unknown;
}

// Helper: full name generate kore
export function getUserName(user: User | null): string {
  if (!user) return "User";
  const name = `${user.firstName || ""} ${user.lastName || ""}`.trim();
  return name || "User";
}

// Helper: avatar URL
export function getUserAvatar(user: User | null): string | null {
  return user?.profilePicture || null;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  refreshUser: () => Promise<void>;
  logout: () => Promise<void>;
}

// ─── Context Create ────────────────────────────────────
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ─── Provider ──────────────────────────────────────────
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  console.log("user from auth context :", user);

  // /auth/me call kore user fetch korbe
  const fetchUser = useCallback(async () => {
    try {
      const res = await apiClient.get("/auth/me");
      // Backend response structure: res.data.data (tumar API onujayi)
      setUser(res.data.data ?? null);
    } catch {
      // 401/403 hole user logged in nai
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // First mount e ekbar call hobe
  useEffect(() => {
    const tryCall = async () => {
      await fetchUser();
    };
    tryCall();
  }, [fetchUser]);

  // Refresh function (jodi kono component manually refresh korte chay)
  const refreshUser = useCallback(async () => {
    setIsLoading(true);
    await fetchUser();
  }, [fetchUser]);

  // Logout handler
  const logout = useCallback(async () => {
    try {
      const response = await apiClient.post("/auth/logout");
      console.log("log out response :", response);
    } catch {
    }
    setUser(null);
  }, []);

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    refreshUser,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// ─── Custom Hook ───────────────────────────────────────
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
