import { useMutation } from "@tanstack/react-query";
import { authApi } from "../api/authApi";
import { ILoginBody, IRegisterBody } from "../types/authTypes";

export const useLogin = () =>
  useMutation({
    mutationKey: ["login"],
    mutationFn: async (body: ILoginBody) => {
      const response = await authApi.post("/login", body);
      return response.data;
    },
  });
