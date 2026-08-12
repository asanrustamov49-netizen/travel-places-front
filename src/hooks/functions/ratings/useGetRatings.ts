import { ratingApi } from "@/hooks/api/ratingApi";
import { IGetRatingResponse } from "@/hooks/types/ratingTypes";
import { useQuery } from "@tanstack/react-query";

export const useGetRatings = () =>
  useQuery({
    queryKey: ["ratings"],
    queryFn: async () => {
      const response = await ratingApi.get<IGetRatingResponse>("");
      return response.data.data;
    },
  });
