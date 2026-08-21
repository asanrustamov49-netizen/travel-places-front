import axios from "axios";

export const bookingApi = axios.create({
  baseURL: "https://travel-places-backend.onrender.com/bookings",
});

bookingApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
