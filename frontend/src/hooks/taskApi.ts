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
      console.log("EITA" + dateFinalToSearch);
      const response = await api.post(
        "/users/tasks/list-by-start-datetime-filter",
        { dateTimeStart: startDateTime, dateTimeEnd: dateFinalToSearch }
      );

      console.log(response);

      return response;
    } catch (erro) {
      console.log(erro);
    }
  },
});
