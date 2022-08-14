import { BsChevronCompactRight } from "react-icons/bs";
import { Task } from "../types/TaskType";
import { api } from "./base_api";

export const TaskApi = () => ({
  createTask: async (task: Task) => {
    try {
      const response = await api.post("/users/tasks", task);

      console.log(response);

      return response;
    } catch (erro) {
      console.log(erro);
    }
  },
  getTask: async (idTask: number) => {
    try {
      const response = await api.get(`/users/tasks/${idTask}`);

      return response.data;
    } catch (erro) {
      console.log(erro);
    }
  },

  listByStartDateTimeFilter: async (
    startDateTime: string,
    dateFinalToSearch: string
  ) => {
    try {
      const response = await api.post(
        "/users/tasks/list-by-start-datetime-filter",
        { dateTimeStart: startDateTime, dateTimeEnd: dateFinalToSearch }
      );

      return response;
    } catch (erro) {
      console.log(erro);
    }
  },

  deleteById: async (id: number) => {
    try {
      const response = await api.delete(`/users/tasks/${id}`);

      return response;
    } catch (erro) {
      console.log(erro);
    }
  },

  editTask: async (task: Task, id: number) => {
    try {
      const response = await api.put(`users/tasks/${id}`, task);

      return response;
    } catch (erro) {
      console.log(erro);
    }
  },

  getTasksWithNoProjectByTitle: async (
    title: string,
    projectIdIfItIsToEdit: string | undefined,
    page: number,
    size: number
  ) => {
    try {
      const response = await api.post(
        `/users/tasks/list-by-no-project?page=${page}&size=${size}`,
        {
          title,
          projectId:
            projectIdIfItIsToEdit !== undefined
              ? Number(projectIdIfItIsToEdit)
              : undefined,
        }
      );

      return response.data;
    } catch (error) {
      console.log(error);
    }
  },

  getColorThatIsToBeShowed: async (
    startDateTime: string,
    dateFinalToSearch: string
  ) => {
    try {
      const response = await api.post(
        "/users/tasks/get-color-that-is-to-be-showed",
        { dateTimeStart: startDateTime, dateTimeEnd: dateFinalToSearch }
      );

      return response.data;
    } catch (erro) {
      console.log(erro);
    }
  },
});
