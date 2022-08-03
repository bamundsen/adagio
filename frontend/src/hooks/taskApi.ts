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
