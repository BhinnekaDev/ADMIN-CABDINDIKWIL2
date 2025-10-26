"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/app/hooks/useAuth";

export default function LoginPage() {
  const { login, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login({ email, password });
  };

  return (
    <div className="flex min-h-screen flex-col md:flex-row transition-colors duration-300 bg-gray-100 dark:bg-[#0f0f11]">
      {/* Left side */}
      <div className="hidden md:flex w-1/2 bg-linear-to-br from-[#2563EB] via-[#1E3A8A] to-[#0F172A] dark:from-[#0F172A] dark:via-[#1E293B] dark:to-[#1E293B] items-center justify-center text-white p-12">
        <div className="max-w-md">
          <h1 className="text-4xl font-bold mb-4 leading-tight drop-shadow-md">
            Selamat Datang Kembali
          </h1>
          <p className="text-lg opacity-95 leading-relaxed">
            Kelola konten dan data website resmi Dinas Pendidikan Kabupaten
            Rejang Lebong dengan mudah dan cepat.
          </p>
        </div>
      </div>

      {/* Right side */}
      <div className="flex flex-1 items-center justify-center p-8">
        <div className="w-full max-w-sm bg-white/90 dark:bg-[#18181B] backdrop-blur-sm rounded-2xl border border-gray-300 dark:border-gray-700/60 shadow-[0_8px_30px_rgb(0,0,0,0.06)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.4)] p-8">
          <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800 dark:text-gray-100">
            Masuk
          </h2>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Email */}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                Email
              </label>
              <input
                type="email"
                placeholder="admin@contoh.com"
                className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-[#1f1f23] px-4 py-2 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password */}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                Kata Sandi
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-[#1f1f23] px-4 py-2 pr-10 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 focus:outline-none cursor-pointer"
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <EyeOff size={18} strokeWidth={2} />
                  ) : (
                    <Eye size={18} strokeWidth={2} />
                  )}
                </button>
              </div>
            </div>

            {/* Forgot */}
            <div className="flex items-end justify-end text-sm">
              <a
                href="#"
                className="text-blue-600 dark:text-blue-400 hover:underline "
              >
                Lupa kata sandi?
              </a>
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold py-2.5 rounded-lg transition-all shadow-sm hover:shadow-md disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
            >
              {loading ? "Memproses..." : "Masuk"}
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-sm mt-6 text-gray-600 dark:text-gray-400">
            Tidak punya akun?{" "}
            <a
              href="#"
              className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
            >
              Ajukan
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
