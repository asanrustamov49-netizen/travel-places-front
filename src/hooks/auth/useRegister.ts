import { useMutation } from "@tanstack/react-query";
import { authApi } from "../api/authApi";
import { IRegisterBody } from "../types/authTypes";

export const useRegister = () =>
  useMutation({
    mutationKey: ["register"],
    mutationFn: async (body: IRegisterBody) => {
      const response = await authApi.post("/register", body);
      return response.data;
    },
  });
