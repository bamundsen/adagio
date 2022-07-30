import axios from "axios";
// import { useContext } from "react";
import { Router, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/auth.context";

const api = axios.create({
  withCredentials: true,
  baseURL: "http://localhost:8079/api/v1",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
});

api.interceptors.response.use(
  (response) => {
    console.log("EI OU KKDJFD");
    return response;
  },
  async function (error) {
    // const navigate = useNavigate();
    // const { setUser, setIsAuthenticated } = useContext(AuthContext);
    console.log("ISSO ?");
    const originalRequest = error.config;

    if (
      error.response.status === 401 &&
      originalRequest.url === "http://localhost:8079/api/v1/auth/refresh"
    ) {
      // setUser(null);
      // setIsAuthenticated(false);

      // navigate("/");
      return Promise.reject(error);
    }

    if (
      (error.response.status === 401 || error.response.status === 403) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      const response = await api.post("/auth/refresh");

      if (response.status === 200) {
        // setUser(response.data.user);
        // setIsAuthenticated(true);
        console.log("REFAZ");
        return axios(originalRequest);
      }
      return response;
    }
    console.log("NÃO REFAZ");
    // return Promise.reject(error);
  }
);

export { api };
