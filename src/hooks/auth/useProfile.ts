import { useMutation, useQuery } from "@tanstack/react-query";
import { authApi } from "../api/authApi";
import { IProfileResponse, IRegisterBody } from "../types/authTypes";

export const useProfile = () =>
  useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const response = await authApi.get<IProfileResponse>("/profile");
      return response.data.data;
    },
  });
