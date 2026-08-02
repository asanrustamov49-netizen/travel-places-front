import axios from "axios";

export const countriesApi = axios.create({
  baseURL: "http://localhost:5000/countries",
});
