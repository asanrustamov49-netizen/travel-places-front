"use client";
import { userApi } from "@/hooks/api/userApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface IUpdateUser {
  id: number;
  name: string;
  email: string;
}

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, name, email }: IUpdateUser) => {
      const response = await userApi.patch(`/${id}`, {
        name,
        email,
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["profile"],
      });
    },
  });
};
