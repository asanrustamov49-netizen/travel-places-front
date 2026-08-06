"use client";
import { userApi } from "@/hooks/api/userApi";
import { INewUserBody } from "@/hooks/types/userTypes";
import { useMutation } from "@tanstack/react-query";

export const useUpdateUser = () =>
  useMutation({
    mutationKey: ["update user"],
    mutationFn: async ({ id, body }: INewUserBody) => {
      const response = await userApi.patch(`/${id}`, body);
      return response.data;
    },
  });
