"use client";
import { authApi } from "@/hooks/api/authApi";
import { IRegisterBody } from "@/hooks/types/authTypes";
import { useMutation } from "@tanstack/react-query";

export const useRegister = () =>
  useMutation({
    mutationKey: ["register"],
    mutationFn: async (body: IRegisterBody) => {
      const response = await authApi.post("/register", body);
      return response.data;
    },
    onSuccess: (res) => {
      console.log(res);
      window.location.href = "/login";
    },
  });
