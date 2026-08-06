import axios from "axios";

export const userApi = axios.create({
  baseURL: "http://localhost:5000/users",
});
