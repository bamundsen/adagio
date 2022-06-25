import { User } from "../types/user";
import { api } from "./base_api";

export const userApi = () => ({
  validateToken: async () => {
    try {
      const response = await api.post("/auth/refresh");

      api.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.token}`;

      console.log("Eia", response);
      return response;
    } catch (erro) {
      console.log("ERRO", erro);
      return erro;
    }
  },

  signin: async (login: string, password: string) => {
    try {
      const response = await api.post("/auth/login", {
        login,
        password,
      });

      api.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.token}`;

      console.log(response);
      return response;
    } catch (erro) {
      return erro;
    }
  },

  logout: async () => {
    try {
      const response = await api.post("/auth/logout");

      console.log(response);
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
