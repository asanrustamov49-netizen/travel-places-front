"use client";
import { placeApi } from "@/hooks/api/placesApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeletePlace = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["delete place"],
    mutationFn: async (id: number) => {
      const response = await placeApi.delete(`/${id}`);
      return response.data;
    },
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["places"],
      });
    },
  });
};
