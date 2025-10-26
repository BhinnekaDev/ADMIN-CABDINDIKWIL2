"use client";

import {
  User,
  LoginPayload,
  LoginResponse,
} from "@/app/hooks/interfaces/auth.interface";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState, useCallback } from "react";

export function useAuth() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = useCallback(async (payload: LoginPayload) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok)
        throw new Error("Gagal masuk. Periksa kembali email/sandi Anda.");

      const data: LoginResponse = await res.json();

      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);

      setUser(data.user);
      setAccessToken(data.accessToken);
      setRefreshToken(data.refreshToken);

      toast.success(
        `Selamat datang, ${data.user.user_metadata?.full_name || "Pengguna"}!`
      );

      return data;
    } catch (err: unknown) {
      console.error("Login error:", err);
      const message =
        err instanceof Error ? err.message : "Login gagal. Silakan coba lagi.";
      setError(message);

      toast.error(message);

      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    setUser(null);
    setAccessToken(null);
    setRefreshToken(null);

    toast.success("Anda telah keluar.");

    router.push("/");
  }, [router, setUser, setAccessToken, setRefreshToken]);

  const restoreSession = useCallback(() => {
    const savedUser = localStorage.getItem("user");
    const savedAccess = localStorage.getItem("accessToken");
    const savedRefresh = localStorage.getItem("refreshToken");

    if (savedUser && savedAccess) {
      setUser(JSON.parse(savedUser));
      setAccessToken(savedAccess);
      setRefreshToken(savedRefresh);
      toast.success("Sesi Anda dipulihkan!");
    }
  }, []);

  return {
    user,
    error,
    login,
    logout,
    loading,
    accessToken,
    refreshToken,
    restoreSession,
  };
}
