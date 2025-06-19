"use client";

import Image from "next/image";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { loginDashboard } from "@/http/api/auth/authService";

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const userData = await loginDashboard(email, password, remember);
      const token =
        userData?.token || userData?.accessToken || userData?.tokenJWT;
      login(token, userData, remember, "/dashboard/selector");
    } catch (err: any) {
      setError(err.message || "Erro ao fazer login");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F2F9FC] px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 border border-[#8FBBDF]">
        <div className="flex justify-center mb-6">
          <Image
            src="/camelvet.png"
            alt="CamelVet Logo"
            width={120}
            height={120}
            className="rounded-xl"
            priority
          />
        </div>

        <h1 className="text-2xl font-semibold text-center text-[#2078BF] mb-4">
          Bem-vindo ao CamelVet
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            required
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 rounded border border-gray-300 focus:ring-2 focus:ring-[#8FBBDF] focus:outline-none"
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              required
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-3 pr-10 w-full rounded border border-gray-300 focus:ring-2 focus:ring-[#8FBBDF] focus:outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#2078BF]"
            >
              {/* ícone permanece igual */}
              {showPassword ? (
                <EyeOffIcon />
              ) : (
                <EyeIcon />
              )}
            </button>
          </div>

          <label className="text-sm text-gray-600 flex items-center gap-2">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              className="accent-[#00C3FF]"
            />
            Permanecer conectado
          </label>

          <button
            type="submit"
            className="bg-[#2078BF] hover:bg-[#00C3FF] text-white font-semibold py-3 rounded transition"
          >
            Entrar
          </button>

          {error && (
            <p className="text-sm text-red-500 text-center font-medium">
              {error}
            </p>
          )}
        </form>

        <p className="text-center text-xs text-gray-500 mt-6">
          © 2025 CamelVet — Todos os direitos reservados.
        </p>
      </div>
    </div>
  );
}

// Ícones separados para clareza
function EyeOffIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
      viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 
           0-1.406.293-2.747.825-3.975m3.375-2.325A9.953 9.953 0 0112 3c5.523 
           0 10 4.477 10 10 0 1.272-.24 2.49-.675 3.6M9.879 9.88a3 3 0 104.243 
           4.243" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M3 3l18 18" />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
      viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 
           9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  );
}
// Note: The EyeIcon and EyeOffIcon components are used to toggle password visibility.