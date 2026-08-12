"use client";
import { useState } from "react";
import scss from "./detailRating.module.scss";
import { useCreateRating } from "@/hooks/functions/ratings/useCreateRating";

interface IDetailRatingProps {
  placeId: number;
}

const DetailRating = ({ placeId }: IDetailRatingProps) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const handleRating = (value: number) => {
    setRating(value);
  };

  const { mutate, isPending } = useCreateRating();

  const handleSubmit = () => {
    if (!rating) return;

    mutate({
      place_id: placeId,
      rating,
    });
  };

  return (
    <div className="container">
      <div className={scss.ratingBox}>
        <div className={scss.header}>
          <div>
            <h3>Rate this place</h3>
            <p>How would you rate your experience?</p>
          </div>

          {rating > 0 && (
            <div className={scss.selectedRating}>
              <span>{rating}.0</span>
              <span className={scss.smallStar}>★</span>
            </div>
          )}
        </div>

        <div className={scss.stars}>
          {[1, 2, 3, 4, 5].map((star) => {
            const active = star <= (hoverRating || rating);

            return (
              <button
                key={star}
                type="button"
                className={`${scss.star} ${active ? scss.active : ""}`}
                onClick={() => handleRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                aria-label={`Rate ${star} out of 5`}
              >
                ★
              </button>
            );
          })}
        </div>

        <div className={scss.ratingLabels}>
          <span>Not great</span>
          <span>Excellent</span>
        </div>

        <button
          type="button"
          className={scss.submitButton}
          disabled={!rating || isPending}
          onClick={handleSubmit}
        >
          {isPending
            ? "Submitting..."
            : rating
              ? "Submit rating"
              : "Select a rating"}
        </button>
      </div>
    </div>
  );
};

export default DetailRating;
