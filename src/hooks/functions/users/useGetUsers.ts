"use client";
import { userApi } from "@/hooks/api/userApi";
import { IUserResponse } from "@/hooks/types/userTypes";
import { useQuery } from "@tanstack/react-query";

export const useGetUsers = () =>
  useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await userApi.get<IUserResponse>("");
      return response.data.data;
    },
  });
