import { Project } from "../types/Project"
import { api } from "./base_api";

export const projectApi = () => ({
    projetc: async (projetc: Project ) => {
        try {
          const response = await api.post("/projeto", projetc);
    
          console.log(response);
          return response;
        } catch (erro) {
          console.log(erro);
        }
      },
})