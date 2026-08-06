"use client"
import { authApi } from "@/hooks/api/authApi";
import { IProfileResponse } from "@/hooks/types/authTypes";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useProfile = () =>
  useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const response = await authApi.get<IProfileResponse>("/profile");
      return response.data.data;
    },
  });
