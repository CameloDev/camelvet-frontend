import api from "@/lib/axios";

export const CreateVacina = async (data: any) => {
  try {
    const response = await api.post("/api/vacina", data);
    console.log("Vacina criada com sucesso:", response.data);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar vacina:", error);
    throw error;
  }
}
