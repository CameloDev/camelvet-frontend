import api from "@/lib/axios";

export const getFazendasDoUsuario = async () => {
  const response = await api.get("/api/fazenda/dashboard/me");
  return response.data;
};