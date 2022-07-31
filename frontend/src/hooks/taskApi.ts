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
});
