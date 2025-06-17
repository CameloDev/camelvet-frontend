import api from "@/lib/axios";

export const getFazendasDoUsuario = async () => {
  const response = await api.get("/api/fazenda/dashboard/me");
  return response.data;
};
export const getFazendaById = async (fazenda_id: string) => {
  try {
    const response = await api.get(`/api/fazenda/dashboard/${fazenda_id}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar fazenda com ID ${fazenda_id}:`, error);
    throw error;
  }
};