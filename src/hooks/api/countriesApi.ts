import axios from "axios";

export const countriesApi = axios.create({
  baseURL: "https://travel-places-backend.onrender.com/countries",
});
