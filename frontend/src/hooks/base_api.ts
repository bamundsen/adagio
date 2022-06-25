import axios from "axios";

const corsConfig = {
  origin: true,
  credentials: true,
};

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
