import axios from "axios";

export const authApi = axios.create({
  baseURL: "http://localhost:5000/auth",
});

authApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
