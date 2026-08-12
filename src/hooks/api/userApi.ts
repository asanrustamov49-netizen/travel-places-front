import axios from "axios";

export const userApi = axios.create({
  baseURL: "http://localhost:5000/users",
});

userApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
