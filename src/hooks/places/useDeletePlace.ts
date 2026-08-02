import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { placeApi } from "../api/placesApi";
import { IOnePlaceResponse } from "../types/placesTypes";

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
