import axios from "axios";

export const statisticsApi = axios.create({
  baseURL: "http://localhost:5000/admin",
});

statisticsApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
