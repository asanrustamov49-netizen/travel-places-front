"use client";
import { userApi } from "@/hooks/api/userApi";
import { QueryClient, useMutation } from "@tanstack/react-query";

export const useDeleteUser = () => {
  const queryClient = new QueryClient();
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
