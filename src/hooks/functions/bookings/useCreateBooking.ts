import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bookingApi } from "../../api/bookingApi";
import type {
  IBookingResponse,
  ICreateBookingBody,
} from "../../types/bookingTypes";

interface ICreateBookingParams {
  placeId: number;
  data: ICreateBookingBody;
}

export const useCreateBooking = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ placeId, data }: ICreateBookingParams) => {
      const response = await bookingApi.post<IBookingResponse>(
        `/${placeId}`,
        data,
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["my bookings"],
      });
    },
  });
};
