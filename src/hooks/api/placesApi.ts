import axios from "axios";

export const placeApi = axios.create({
  baseURL: "http://localhost:5000/places",
});
