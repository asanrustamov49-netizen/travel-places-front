import { useMutation, useQuery } from "@tanstack/react-query";
import { placeApi } from "../api/placesApi";
import { IOnePlaceResponse, IPlaceNewBody } from "../types/placesTypes";

export const useUpdatePlace = () =>
  useMutation({
    mutationKey: ["update place"],
    mutationFn: async ({ id, body }: IPlaceNewBody) => {
      const response = await placeApi.patch(`/${id}`, body);
      return response.data;
    },
  });
