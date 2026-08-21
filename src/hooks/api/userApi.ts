import axios from "axios";

export const userApi = axios.create({
  baseURL: "https://travel-places-backend.onrender.com/users",
});

userApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
