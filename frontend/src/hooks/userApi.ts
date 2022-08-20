import { User } from "../types/UserType";
import { api } from "./base_api";

export const UserApi = () => ({
  validateToken: async () => {
    try {
      const response = await api.post("/auth/refresh/");

      return response;
    } catch (erro) {
      return erro;
    }
  },

  signin: async (login: string, password: string) => {
    try {
      const response = await api.post("/auth/login/", {
        login,
        password,
      });

      return response;
    } catch (erro) {
      return erro;
    }
  },

  logout: async () => {
    try {
      const response = await api.post("/auth/logout/");
      console.log(response);
    } catch (erro) {
      console.log(erro);
    }
  },
  register: async (user: User) => {
    try {
      const response = await api.post("/auth/register/", user);
      return response;
    } catch (error) {
      return error;
    }
  },

  // teste: async () => {
  //   try {
  //     const response = await api.get("/teste");

  //   } catch (erro) {
  //     console.log(erro);
  //   }
  // },
});
