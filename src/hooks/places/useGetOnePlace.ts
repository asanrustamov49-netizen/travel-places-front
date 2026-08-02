import { useQuery } from "@tanstack/react-query";
import { placeApi } from "../api/placesApi";
import { IOnePlaceResponse } from "../types/placesTypes";

export const useGetOnePlace = (id: number) =>
  useQuery({
    queryKey: ["get one place", id],
    queryFn: async () => {
      const response = await placeApi.get<IOnePlaceResponse>(`/${id}`);
      return response.data.data;
    },
  });
