import type { Metadata } from "next";
import { ReactNode } from "react";
import { AuthProvider } from "@/contexts/AuthContext";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "CamelVet - Login",
  description: "CamelVet - Sistema de Gestão Veterinária",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <title>CamelVet</title>
      </head>
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
