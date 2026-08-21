import axios from "axios";

export const statisticsApi = axios.create({
  baseURL: "https://travel-places-backend.onrender.com/admin",
});

statisticsApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
