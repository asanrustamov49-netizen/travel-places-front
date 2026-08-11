"use client";
import { placeApi } from "@/hooks/api/placesApi";
import { useMutation } from "@tanstack/react-query";

export const useCreatePlace = () =>
  useMutation({
    mutationKey: ["create place"],
    mutationFn: async (body: FormData) => {
      const response = await placeApi.post("", body);
      return response.data;
    },
  });
