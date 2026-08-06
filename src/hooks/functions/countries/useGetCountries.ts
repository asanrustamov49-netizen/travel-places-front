"use client"
import { countriesApi } from "@/hooks/api/countriesApi";
import { ICountryResponse } from "@/hooks/types/countriesTypes";
import { useQuery } from "@tanstack/react-query";

export const useGetCountries = () =>
  useQuery({
    queryKey: ["countries"],
    queryFn: async () => {
      const response = await countriesApi.get<ICountryResponse>("");
      return response.data.data;
    },
  });
