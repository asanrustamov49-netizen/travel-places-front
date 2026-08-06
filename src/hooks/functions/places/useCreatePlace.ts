"use client"
import { placeApi } from "@/hooks/api/placesApi";
import { ICreatePlaceBody } from "@/hooks/types/placesTypes";
import { useMutation } from "@tanstack/react-query";

export const useCreatePlace = () =>
  useMutation({
    mutationKey: ["create place"],
    mutationFn: async (body: ICreatePlaceBody) => {
      const response = await placeApi.post("", body);
      return response.data;
    },
  });
