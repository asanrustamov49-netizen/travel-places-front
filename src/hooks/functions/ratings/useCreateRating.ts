import { ratingApi } from "@/hooks/api/ratingApi";
import { ICreateRating } from "@/hooks/types/ratingTypes";
import { useMutation } from "@tanstack/react-query";

export const useCreateRating = () =>
  useMutation({
    mutationKey: ["create rating"],
    mutationFn: async (body: ICreateRating) => {
      const response = await ratingApi.post(
        `/${body.place_id}`,
        {
          rating: body.rating,
        }
      );
      return response.data;
    },
  });
