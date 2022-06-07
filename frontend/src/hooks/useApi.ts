import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8092",
});

export const useApi = () => ({
  validateToken: async (token: string) => {
    const response = await api.post("/validate", { token });
    return response.data;
  },

  signin: async (login: string, password: string) => {
    const response = await api.post("/auth/login", { login, password });

    console.log(response.data);
    return response.data;
  },

  logout: async () => {
    const response = await api.post("/logout");
    return response.data;
  },
});
