import { useQuery } from "@tanstack/react-query";
import { placeApi } from "../api/placesApi";
import { IPlaceResponse } from "../types/placesTypes";

export const useGetPlaces = () =>
  useQuery({
    queryKey: ["places"],
    queryFn: async () => {
      const response = await placeApi.get<IPlaceResponse>("/");
      return response.data.data;
    },
  });
