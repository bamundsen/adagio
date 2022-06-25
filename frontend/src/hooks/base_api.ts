import axios from "axios";

const api = axios.create({
  withCredentials: true,
  baseURL: "http://localhost:8079/api/v1",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
});

export { api };
