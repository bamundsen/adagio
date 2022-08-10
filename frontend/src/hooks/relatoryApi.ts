import { api } from "./base_api";

export const RelatoryApi = () => ({
  getByMonth: async (month: number, year: number) => {
    try {
      const response = await api.post(
        `/users/relatory/get-by-month`,
        {
          month,
          year,
        },
        {
          responseType: "blob",
        }
      );
      console.log(response);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `tasks_by_month.xlsx`);
      link.click();

      setTimeout(() => window.URL.revokeObjectURL(url), 0);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
  getByYear: async (year: number) => {
    try {
      const response = await api.post(
        `/users/relatory/get-by-year`,
        {
          year,
        },
        {
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "tasks_by_year.xlsx");
      link.click();

      setTimeout(() => window.URL.revokeObjectURL(url), 0);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
  getByDay: async (startDateTime: string, endDateTime: string) => {
    try {
      const response = await api.post(
        `/users/relatory/get-by-day`,
        { startDate: startDateTime, endDate: endDateTime },
        {
          responseType: "blob",
        }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `tasks_by_day.xlsx`);
      link.click();

      setTimeout(() => window.URL.revokeObjectURL(url), 0);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
});
