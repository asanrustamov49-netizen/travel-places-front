"use client"
import { countriesApi } from "@/hooks/api/countriesApi";
import { IOneCountryResponse } from "@/hooks/types/countriesTypes";
import { useQuery } from "@tanstack/react-query";

export const useGetOneCountry = (id: number) =>
  useQuery({
    queryKey: ["get one country", id],
    queryFn: async () => {
      const response = await countriesApi.get<IOneCountryResponse>(`/${id}`);
      return response.data.data;
    },
  });
