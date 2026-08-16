"use client";
import { userApi } from "@/hooks/api/userApi";
import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["delete user"],
    mutationFn: async (id: number) => {
      const response = await userApi.delete(`/${id}`);
      return response.data;
    },
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
  });
};
