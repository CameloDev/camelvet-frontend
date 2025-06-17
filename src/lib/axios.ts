import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080/",
  timeout: 150000, // 150 segundos irei mudar mas como ainda sou pobre e nao tenho um servidor pago terei que buscar do render e é lento
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: false,
});

const publicEndpoints = [
  "/cliente/cadastrar",
  "/api/auth/login",
];

api.interceptors.request.use((config) => {
  const isPublic = publicEndpoints.some((endpoint) =>
    config.url?.startsWith(endpoint)
  );

  if (typeof window !== "undefined" && !isPublic) {
    const token =
      localStorage.getItem("tokenJWT") || sessionStorage.getItem("tokenJWT");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response, request, config } = error;

    if (response && response.status === 404) {
      console.warn(`404 - Recurso não encontrado em: ${config.url}`);
      return Promise.resolve({ data: null, status: 404, config, headers: response.headers });
    }

    if (error.code === "ECONNABORTED") {
      error.message = "Tempo de requisição excedido.";
    } else if (request && !response) {
      error.message = "Falha de conexão com o servidor.";
    }

    if (response) {
      const resData = response.data;
      const defaultMessage = `Erro ${response.status}`;
      let errorMessage = '';

      if (typeof resData === "string") errorMessage = resData;
      else if (resData?.message) errorMessage = resData.message;
      else if (resData?.error) errorMessage = resData.error;
      else errorMessage = defaultMessage;

      error.message = errorMessage;

      switch (response.status) {
        case 401:
          if (typeof window !== "undefined") {
            localStorage.clear();
            sessionStorage.clear();
          }
          break;
        case 403:
          error.message = "Acesso negado.";
          break;
        case 500:
          error.message = "Erro interno no servidor.";
          break;
      }
    }

    return Promise.reject(error);
  }
);

export default api;
