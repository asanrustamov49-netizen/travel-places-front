"use client"
import { placeApi } from "@/hooks/api/placesApi";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";

export const useDeletePlace = () => {
  const queryClient = new QueryClient();
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
