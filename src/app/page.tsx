"use client";

import Image from "next/image";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Entrando com ${email}`);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-tr from-green-50 via-blue-50 to-white px-6">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <div className="flex justify-center mb-8">
          <Image
            src="/camelvet-logo.svg"
            alt="CamelVet Logo"
            width={180}
            height={60}
            priority
          />
        </div>

        <h1 className="text-3xl font-semibold text-center text-green-800 mb-6">
          Bem-vindo ao CamelVet
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <label className="flex flex-col text-gray-700 font-medium">
            Email
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              className="mt-1 rounded border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </label>

          <label className="flex flex-col text-gray-700 font-medium">
            Senha
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Sua senha"
              className="mt-1 rounded border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </label>

          <button
            type="submit"
            className="mt-6 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded transition"
          >
            Entrar
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          © 2025 CamelVet. Todos os direitos reservados.
        </p>
      </div>
    </div>
  );
}
