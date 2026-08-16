"use client";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGetOnePlace } from "@/hooks/functions/places/useGetOnePlace";
import { useCreateBooking } from "@/hooks/functions/bookings/useCreateBooking";
import {
  bookingSchema,
  type BookingFormSchema,
} from "@/validation/booking.validate";
import scss from "./booking.module.scss";

const Booking = () => {
  const params = useParams();
  const {push} = useRouter();
  const { data: place, isLoading: placeLoading } = useGetOnePlace(Number(params.id));
  const createBooking = useCreateBooking();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<BookingFormSchema>({
    resolver: zodResolver(bookingSchema)
  });
  const checkIn = watch("check_in");
  const checkOut = watch("check_out");
  const getNights = () => {
    if (!checkIn || !checkOut) {
      return 0;
    }
    const start = new Date(`${checkIn}T00:00:00Z`).getTime();
    const end = new Date(`${checkOut}T00:00:00Z`).getTime();
    const millisecondsPerDay = 1000 * 60 * 60 * 24;
    const nights = Math.round((end - start) / millisecondsPerDay);
    return nights > 0 ? nights : 0;
  };
  const nights = getNights();
  const price = Number(place?.price);
  const previewTotal = nights * price;
  const onSubmit = async (data: BookingFormSchema) => {
    try {
      await createBooking.mutateAsync({
        placeId: Number(params.id),
        data: {
          check_in: data.check_in,
          check_out: data.check_out,
          guests_count: data.guests_count,
        },
      });
      push("/my-bookings");
    } catch (error) {
      console.error(error);
    }
  };
  if (placeLoading) {
    return (
      <main className={scss.page}>
        <div className={scss.card}>
          <p>Loading...</p>
        </div>
      </main>
    );
  }
  if (!place) {
    return (
      <main className={scss.page}>
        <div className={scss.card}>
          <p>Place not found</p>
        </div>
      </main>
    );
  }
  return (
    <main className={scss.page}>
      <div className={scss.card}>
        <div className={scss.placeInfo}>
          <h1>Book: {place.title}</h1>
          <p>
            {place.city}, {place.country_name}
          </p>
          <strong>${place.price} / night</strong>
        </div>
        <form className={scss.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={scss.field}>
            <label htmlFor="check_in">Check-in</label>
            <input id="check_in" type="date" {...register("check_in")} />
            {errors.check_in && (
              <span className={scss.error}>{errors.check_in.message}</span>
            )}
          </div>
          <div className={scss.field}>
            <label htmlFor="check_out">Check-out</label>
            <input id="check_out" type="date" {...register("check_out")} />
            {errors.check_out && (
              <span className={scss.error}>{errors.check_out.message}</span>
            )}
          </div>
          <div className={scss.field}>
            <label htmlFor="guests_count">Guests</label>
            <input
              id="guests_count"
              type="number"
              min={1}
              max={20}
              {...register("guests_count", {
                valueAsNumber: true,
              })}
            />
            {errors.guests_count && (
              <span className={scss.error}>{errors.guests_count.message}</span>
            )}
          </div>
          <div className={scss.summary}>
            <div>
              <span>Nights</span>
              <strong>{nights}</strong>
            </div>
            <div>
              <span>Price per night</span>
              <strong>${price}</strong>
            </div>
            <div className={scss.total}>
              <span>Total</span>
              <strong>${previewTotal}</strong>
            </div>
          </div>
          {createBooking.isError && (
            <p className={scss.error}>
              {createBooking.error instanceof Error
                ? createBooking.error.message
                : "Something went wrong"}
            </p>
          )}
          <button
            type="submit"
            className={scss.submitButton}
            disabled={createBooking.isPending}
          >
            {createBooking.isPending ? "Booking..." : "Confirm booking"}
          </button>
        </form>
      </div>
    </main>
  );
};

export default Booking;
