import { useMutation } from "@tanstack/react-query";
import { placeApi } from "../api/placesApi";
import { ICreatePlaceBody } from "../types/placesTypes";

export const useCreatePlace = () =>
  useMutation({
    mutationKey: ["create place"],
    mutationFn: async (body: ICreatePlaceBody) => {
      const response = await placeApi.post("/", body);
      return response.data;
    },
  });
