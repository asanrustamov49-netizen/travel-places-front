"use client";
import { placeApi } from "@/hooks/api/placesApi";
import { IGetPlacesParams, IPlaceResponse } from "@/hooks/types/placesTypes";
import { useQuery } from "@tanstack/react-query";

export const useGetPlaces = (params: IGetPlacesParams) =>
  useQuery({
    queryKey: ["places", params],
    queryFn: async () => {
      const response = await placeApi.get<IPlaceResponse>("", {
        params,
      });
      return response.data.data;
    },
  });
