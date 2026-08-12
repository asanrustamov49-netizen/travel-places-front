import { z } from "zod";

export const bookingSchema = z
  .object({
    check_in: z.string().min(1, "Choose check-in date"),

    check_out: z.string().min(1, "Choose check-out date"),

    guests_count: z
      .number()
      .int("Guests must be an integer")
      .min(1, "At least 1 guest")
      .max(20, "Maximum 20 guests"),
  })
  .refine(
    (data) => {
      if (!data.check_in || !data.check_out) {
        return true;
      }

      return data.check_out > data.check_in;
    },
    {
      message: "Check-out must be later than check-in",
      path: ["check_out"],
    },
  )
  .refine(
    (data) => {
      if (!data.check_in) {
        return true;
      }

      const today = new Date().toISOString().split("T")[0];

      return data.check_in >= today;
    },
    {
      message: "Check-in cannot be in the past",
      path: ["check_in"],
    },
  );

export type BookingFormSchema = z.infer<typeof bookingSchema>;
