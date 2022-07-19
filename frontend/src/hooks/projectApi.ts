import { Project } from "../types/Project";
import { api } from "./base_api";

export const ProjectApi = () => ({
  getProjects: async (size?: number, page?: number) => {
    try {
      const response = await api.get(
        `/users/projects?size=${size === undefined ? 6 : size}&page=${
          page === undefined ? 0 : page
        }`
      );

      console.log(response);
      return response.data.content;
    } catch (erro) {
      console.log(erro);
    }
  },

  createProject: async (project: Project) => {
    try {
      const response = await api.post("/users/projects", project);

      console.log(response);
      return response;
    } catch (erro) {
      console.log(erro);
    }
  },
});
