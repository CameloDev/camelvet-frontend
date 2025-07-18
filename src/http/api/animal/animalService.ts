import api from '@/lib/axios';
import { Animal } from '@/@types/animalPost';
import { AxiosError } from "axios";

export const adicionarAnimal = async (fazendaId: number, data: Animal) => {
  try {
    const response = await api.post(`/api/animal/${fazendaId}`, data);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response) {
        const status = error.response.status;
        const data = error.response.data;
        const mensagem = data?.message || JSON.stringify(data) || "Erro desconhecido da API";

        console.error(`Erro ${status} da API: ${mensagem}`);

        throw new Error(`Erro ${status}: ${mensagem}`);
      } else if (error.request) {
        console.error("Sem resposta do servidor:", error.message);
        throw new Error("Sem resposta do servidor. Verifique sua conexão.");
      } else {
        console.error("Erro ao configurar requisição:", error.message);
        throw new Error(error.message);
      }
    } else {
      console.error("Erro inesperado:", error);
      throw new Error("Erro inesperado. Tente novamente.");
    }
  }
};
export const listarAnimaisPorFazenda = async (fazendaId: number): Promise<Animal[]> => {
  const response = await api.get(`/api/animal/fazenda/${fazendaId}`);
  return response.data;
};
