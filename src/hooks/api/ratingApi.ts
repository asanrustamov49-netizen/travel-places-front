import axios from "axios";

export const ratingApi = axios.create({
  baseURL: "https://travel-places-backend.onrender.com/ratings",
});

ratingApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
