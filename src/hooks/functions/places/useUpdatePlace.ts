"use client"
import { placeApi } from "@/hooks/api/placesApi";
import { IPlaceNewBody } from "@/hooks/types/placesTypes";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useUpdatePlace = () =>
  useMutation({
    mutationKey: ["update place"],
    mutationFn: async ({ id, body }: IPlaceNewBody) => {
      const response = await placeApi.patch(`/${id}`, body);
      return response.data;
    },
  });
