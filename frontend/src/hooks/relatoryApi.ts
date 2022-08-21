import { api } from "./base_api";

const generatedIn = () => {
  const now = new Date();
  return `${String(now.getDate()).padStart(2, "0")}/${String(
    now.getMonth() + 1
  ).padStart(2, "0")}/${String(now.getFullYear()).padStart(2, "0")}${String(
    now.getHours()
  ).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}:${String(
    now.getSeconds()
  ).padStart(2, "0")}`;
};

const returnFileName = (name: string) => {
  return `${name}_generated_in_${generatedIn()}.xlsx`;
};

export const RelatoryApi = () => ({
  getByMonth: async (month: number, year: number) => {
    try {
      const response = await api.post(
        `/users/relatory/get-by-month/`,
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
      link.setAttribute("download", returnFileName("tasks_by_month"));
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
        `/users/relatory/get-by-year/`,
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
      link.setAttribute("download", returnFileName(`tasks_by_year(${year})`));
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
        `/users/relatory/get-by-day/`,
        { startDate: startDateTime, endDate: endDateTime },
        {
          responseType: "blob",
        }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", returnFileName("tasks_by_day"));
      link.click();

      setTimeout(() => window.URL.revokeObjectURL(url), 0);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
  getProjectsByPage: async (size: number, page: number) => {
    try {
      const response = await api.get(
        `/users/relatory/get-projects-by-page?page=${page}&size=${size}/`,
        { responseType: "blob" }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", returnFileName("projects_by_page"));
      // link.click();

      // setTimeout(() => window.URL.revokeObjectURL(url), 0);
      return [response.data, link, url];
    } catch (error) {
      console.log(error);
    }
  },

  getTasksByPageAndProject: async (
    size: number,
    page: number,
    idProject: number
  ) => {
    try {
      const response = await api.post(
        `/users/relatory/get-tasks-by-page-and-project?page=${page}&size=${size}/`,
        { idProject },
        { responseType: "blob" }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        returnFileName("tasks_by_page_and_project")
      );
      link.click();

      setTimeout(() => window.URL.revokeObjectURL(url), 0);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
});
