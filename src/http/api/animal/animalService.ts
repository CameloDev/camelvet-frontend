import api from "@/lib/axios";

export const AdicionarAnimal = async (data: any) => {
  try {
    const response = await api.post("/api/animal", data);
    console.log("Animal adicionado com sucesso:", response.data);
    return response.data;
  } catch (error) {
    console.error("Erro ao adicionar animal:", error);
    throw error;
  }
}