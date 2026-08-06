"use client";
import { authApi } from "@/hooks/api/authApi";
import { ILoginBody } from "@/hooks/types/authTypes";
import { useMutation } from "@tanstack/react-query";

export const useLogin = () =>
  useMutation({
    mutationKey: ["login"],
    mutationFn: async (body: ILoginBody) => {
      const response = await authApi.post("/login", body);
      return response.data;
    },
    onSuccess: (res) => {
      console.log(res);
      localStorage.setItem("token", res.token);
      window.location.href = "/";
    },
  });
