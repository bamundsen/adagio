import { User } from "../types/user";
import { api } from "./base_api";

export const userApi = () => ({
  validateToken: async (token: string | null) => {
    try {
      const response = await api.post("/auth/validate", { token });

      console.log(response);
      return response.data;
    } catch (erro) {
      console.log(erro);
    }
  },

  signin: async (login: string, password: string) => {
    try {
      const response = await api.post("/auth/login", { login, password });

      console.log(response);
      return response.data;
    } catch (erro) {
      console.log(erro);
    }
  },

  register: async (user: User) => {
    try {
      const response = await api.post("/auth/register", user);

      console.log(response);
      return response;
    } catch (erro) {
      console.log(erro);
    }
  },
});
