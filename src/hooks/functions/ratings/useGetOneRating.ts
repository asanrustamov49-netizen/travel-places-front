import { ratingApi } from "@/hooks/api/ratingApi";
import { IGetOneRatingResponse } from "@/hooks/types/ratingTypes";
import { useQuery } from "@tanstack/react-query";

export const useGetOneRating = (id: number) =>
  useQuery({
    queryKey: ["get one rating", id],
    queryFn: async () => {
      const response = await ratingApi.get<IGetOneRatingResponse>("");
      return response.data.data;
    },
  });
