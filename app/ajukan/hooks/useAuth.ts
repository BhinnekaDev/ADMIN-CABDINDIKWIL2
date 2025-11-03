"use client";

import {
  RegisterPayload,
  RegisterResponse,
} from "@/app/ajukan/hooks/interfaces/auth.interface";
import toast from "react-hot-toast";
import { useState, useCallback } from "react";

export function useAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const register = useCallback(async (payload: RegisterPayload) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}auth/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok)
        throw new Error("Gagal masuk. Periksa kembali email/sandi Anda.");

      const data: RegisterResponse = await res.json();

      toast.success("Silahkan verifikasi email untuk masuk");

      return data;
    } catch (err: unknown) {
      console.error("Register error:", err);
      const message =
        err instanceof Error
          ? err.message
          : "Pendaftaran gagal. Silakan coba lagi.";
      setError(message);

      toast.error(message);

      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    error,
    loading,
    register,
  };
}
