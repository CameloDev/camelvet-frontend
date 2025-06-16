"use client";

import { createContext, useContext, ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface AuthContextType {
  isAuthenticated: boolean;
  user: any;
  login: (token: string, userData: any, remember: boolean, redirectUrl?: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const token =
      localStorage.getItem("tokenJWT") || sessionStorage.getItem("tokenJWT");
    const userData =
      localStorage.getItem("userData") || sessionStorage.getItem("userData");

    if (token && userData) {
      setIsAuthenticated(true);
      setUser(JSON.parse(userData));
    }
  }, []);

  const login = (
    token: string,
    userData: any,
    remember: boolean,
    redirectUrl = "/dashboard"
  ) => {
    const storage = remember ? localStorage : sessionStorage;

    storage.setItem("tokenJWT", token);
    storage.setItem("userData", JSON.stringify(userData));

    setIsAuthenticated(true);
    setUser(userData);
    router.push(redirectUrl);
  };

  const logout = () => {
    localStorage.clear();
    sessionStorage.clear();
    setIsAuthenticated(false);
    setUser(null);
    router.push("/dashboard/login");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth precisa estar dentro do AuthProvider");
  }
  return context;
};
