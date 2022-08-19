import { Project } from "../types/ProjectType";
import { api } from "./base_api";

export const ProjectApi = () => ({
  getProjects: async (size?: number, page?: number) => {
    try {
      const response = await api.get(
        `/users/projects?size=${size === undefined ? 6 : size}&page=${
          page === undefined ? 0 : page
        }`
      );

      return response.data;
    } catch (erro) {
      return erro;
    }
  },

  getProject: async (idProject: number) => {
    try {
      const response = await api.get(`/users/projects/${idProject}`);

      return response.data;
    } catch (erro) {
      throw erro;
    }
  },

  createProject: async (project: Project) => {
    try {
      const response = await api.post("/users/projects", project);

      return response;
    } catch (error) {
      console.log(error);
      return error;
    }
  },

  editProject: async (project: Project, id: number) => {
    try {
      const response = await api.put(`users/projects/${id}`, project);

      return response;
    } catch (error) {
      return error;
    }
  },

  deleteProject: async (id: number) => {
    try {
      const response = await api.delete(`users/projects/${id}`);

      return response;
    } catch (erro) {
      console.log(erro);
    }
  },

  getTasksByProject: async (id: number, size?: number, page?: number) => {
    try {
      const response = await api.get(
        `users/projects/${id}/tasks?size=${
          size === undefined ? 7 : size
        }&page=${page === undefined ? 0 : page}`
      );

      return response.data;
    } catch (erro) {
      throw erro;
    }
  },

  getProjectsByTitle: async (title: string, size?: number, page?: number) => {
    try {
      const response = await api.post(
        `users/projects/list-by-title?page=${
          page === undefined ? 0 : page
        }&size=${size === undefined ? 7 : size}`,
        { title }
      );

      return response.data;
    } catch (erro) {
      console.log(erro);
    }
  },
});
