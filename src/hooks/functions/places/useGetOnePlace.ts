"use client"
import { placeApi } from "@/hooks/api/placesApi";
import { IOnePlaceResponse } from "@/hooks/types/placesTypes";
import { useQuery } from "@tanstack/react-query";

export const useGetOnePlace = (id: number) =>
  useQuery({
    queryKey: ["get one place", id],
    queryFn: async () => {
      const response = await placeApi.get<IOnePlaceResponse>(`/${id}`);
      return response.data.data;
    },
  });
