import { useQuery } from "@tanstack/react-query";
import { bookingApi } from "../../api/bookingApi";
import type { IBookingsResponse } from "../../types/bookingTypes";

export const useGetMyBookings = () => {
  return useQuery({
    queryKey: ["my bookings"],
    queryFn: async () => {
      const response = await bookingApi.get<IBookingsResponse>("/my");
      return response.data.data;
    },
  });
};
