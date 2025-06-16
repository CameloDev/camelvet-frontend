"use client";

import Image from "next/image";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFFBEA] px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 border border-[#fef3c7]">
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

        <h1 className="text-2xl font-semibold text-center text-[#1E293B] mb-4">
          Bem-vindo ao CamelVet
        </h1>

        <p className="text-center text-sm text-gray-600 mb-6">
          Acesse sua conta para continuar
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            required
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 rounded border border-gray-300 focus:ring-2 focus:ring-[#FACC15] focus:outline-none"
          />

          <input
            type="password"
            required
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-3 rounded border border-gray-300 focus:ring-2 focus:ring-[#FACC15] focus:outline-none"
          />

          <button
            type="submit"
            className="bg-[#FEF08A] hover:bg-[#FDE047] text-[#1E293B] font-semibold py-3 rounded transition">
            Entrar
          </button>
        </form>

        <p className="text-center text-xs text-gray-500 mt-6">
          © 2025 CamelVet — Todos os direitos reservados.
        </p>
      </div>
    </div>
  );
}
