import { useQuery } from "@tanstack/react-query";
import { placeApi } from "../api/placesApi";
import { IPlaceResponse } from "../types/placesTypes";
import { countriesApi } from "../api/countriesApi";
import { ICountryResponse } from "../types/countriesTypes";

export const useGetCountries = () =>
  useQuery({
    queryKey: ["countries"],
    queryFn: async () => {
      const response = await countriesApi.get<ICountryResponse>("/");
      return response.data.data;
    },
  });
