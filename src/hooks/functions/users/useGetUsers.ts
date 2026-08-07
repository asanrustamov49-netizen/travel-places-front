"use client";
import { userApi } from "@/hooks/api/userApi";
import { IGetUsersParams, IUserResponse, IUsersResponse } from "@/hooks/types/userTypes";
import { useQuery } from "@tanstack/react-query";

export const useGetUsers = (params: IGetUsersParams) =>
  useQuery({
    queryKey: ["users", params],
    queryFn: async () => {
      const response = await userApi.get<IUsersResponse>("", {
        params,
      });
      return response.data;
    },
  });
