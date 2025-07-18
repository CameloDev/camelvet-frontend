import api from "@/lib/axios";

export const loginDashboard = async (
  email: string,
  senha: string,
  remember = false
) => {
const response = await api.post("/api/auth/login", { email, senha });

  console.log("response.data", response.data);

  const token =
    response.data?.token ||
    response.data?.accessToken ||
    response.data?.tokenJWT;

  if (!token) {
    console.error("Resposta da API não contém token:", response.data);
    throw new Error("Token não recebido da API");
  }

  const storage = remember ? localStorage : sessionStorage;
  storage.setItem("tokenJWT", token);
  storage.setItem("userData", JSON.stringify(response.data));

  return response.data;
};
