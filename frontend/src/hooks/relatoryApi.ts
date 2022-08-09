import { api } from "./base_api";

export const RelatoryApi = () => ({
  getByMonth: async (month: number, year: number) => {
    try {
      const response = await api.post(`/users/relatory/get-by-month`, {
        month,
        year,
      });

      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
});
