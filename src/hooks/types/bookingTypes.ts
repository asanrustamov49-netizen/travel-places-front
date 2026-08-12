export interface ICreateBookingBody {
  check_in: string;
  check_out: string;
  guests_count: number;
}

export interface IBooking {
  id: number;
  user_id: number;
  place_id: number;
  check_in: string;
  check_out: string;
  guests_count: number;
  total_price: string;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  created_at: string;
  place_title?: string;
  place_city?: string;
  country_name?: string;
  price_per_night?: string;
}

export interface IBookingResponse {
  message: string;
  data: IBooking;
}

export interface IBookingsResponse {
  message: string;
  data: IBooking[];
}
