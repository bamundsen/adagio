import { api } from "./base_api";

export const AuxInformationApi = () => ({
  getQuantityOfTasksOfToday: async () => {
    try {
      const response = await api.get(
        "/users/aux-information/get-quantity-of-tasks-of-today"
      );

      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
  getTodayTasksToBeAlerted: async () => {
    try {
      const response = await api.get(
        "/users/aux-information/get-today-tasks-to-be-alerted"
      );

      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
});
