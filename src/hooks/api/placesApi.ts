import axios from "axios";

export const placeApi = axios.create({
  baseURL: "http://localhost:5000/places",
});

placeApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
