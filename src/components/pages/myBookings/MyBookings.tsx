"use client";
import Link from "next/link";
import { useGetMyBookings } from "@/hooks/functions/bookings/useGetMyBookings";
import scss from "./myBookings.module.scss";

const MyBookings = () => {
  const { data: bookings, isLoading, isError } = useGetMyBookings();
  if (isLoading) {
    return (
      <main className={scss.page}>
        <h1>My bookings</h1>
        <p>Loading...</p>
      </main>
    );
  }
  if (isError) {
    return (
      <main className={scss.page}>
        <h1>My bookings</h1>
        <p>Failed to load bookings.</p>
      </main>
    );
  }
  return (
    <main className={scss.page}>
      <div className={scss.container}>
        <h1>My bookings</h1>
        {!bookings || bookings.length === 0 ? (
          <div className={scss.empty}>
            <h2>No bookings yet</h2>
            <p>You haven't booked any places yet.</p>
            <Link href="/">Explore places</Link>
          </div>
        ) : (
          <div className={scss.list}>
            {bookings.map((booking) => (
              <Link
                href={`/my-bookings/${booking.id}`}
                className={scss.card}
                key={booking.id}
              >
                <div className={scss.info}>
                  <h2>{booking.place_title}</h2>
                  <p>
                    {booking.place_city}, {booking.country_name}
                  </p>
                </div>
                <div className={scss.details}>
                  <span>
                    {booking.check_in} — {booking.check_out}
                  </span>
                  <span>Guests: {booking.guests_count}</span>
                  <strong>${booking.total_price}</strong>
                  <span className={`${scss.status} ${scss[booking.status]}`}>
                    {booking.status}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default MyBookings;
