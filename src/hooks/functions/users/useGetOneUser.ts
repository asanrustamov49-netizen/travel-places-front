"use client";
import { userApi } from "@/hooks/api/userApi";
import { IOneUserResponse } from "@/hooks/types/userTypes";
import { useQuery } from "@tanstack/react-query";

export const useGetOneUser = (id: number) =>
  useQuery({
    queryKey: ["get one user", id],
    queryFn: async () => {
      const response = await userApi.get<IOneUserResponse>(`/${id}`);
      return response.data.data;
    },
  });
