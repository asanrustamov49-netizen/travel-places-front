"use client";
import { useGetMyBookings } from "@/hooks/functions/bookings/useGetMyBookings";
import { useMemo, useState } from "react";
import Link from "next/link";
import scss from "./detailTop.module.scss";
import { IOnePlaceResult, IPlaceResult } from "@/hooks/types/placesTypes";
import { useWishList } from "@/hooks/functions/useWishList";
import UserAvatar from "@/components/ui/userAvatar/UserAvatar";
import { useRouter } from "next/navigation";

interface IDetailTop {
  place: IOnePlaceResult;
}

const DetailTop = ({ place }: IDetailTop) => {
  const [activeImage, setActiveImage] = useState(0);
  const { data: bookings } = useGetMyBookings();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const isBooked = bookings?.some(
    (booking) =>
      booking.place_id === place.id &&
      ["pending", "confirmed"].includes(booking.status),
  );
  const [showModal, setShowModal] = useState(false);
  const { push } = useRouter();
  const { addToWishList, wishList } = useWishList();
  const isSaved = wishList.some((item) => item.id === place.id);
  const handleWishlist = () => {
    if (isSaved) return;
    addToWishList(place);
    setShowModal(true);
  };
  const handleBookNow = () => {
    if (!token) {
      setShowAuthModal(true);
      return;
    }
    push(`/booking/${place.id}`);
  };
  return (
    <section className={scss.container}>
      <div className="container">
        <div className={scss.breadcrumbs}>
          <Link href="/">Home</Link>
          <span>›</span>
          <span>{place.title}</span>
        </div>
        <div className={scss.mainContainer}>
          <div className={scss.leftSide}>
            <div className={scss.mainImage}>
              {place.images.length > 0 && (
                <img
                  src={`https://travel-places-backend.onrender.com${place.images[activeImage].image_url}`}
                  alt={place.title}
                  width={1000}
                  height={700}
                />
              )}
            </div>
            <div className={scss.gallery}>
              {place.images.map((image, index) => (
                <button
                  key={image.id}
                  type="button"
                  onClick={() => setActiveImage(index)}
                  className={activeImage === index ? scss.activeThumbnail : ""}
                >
                  <img
                    src={`https://travel-places-backend.onrender.com${image.image_url}`}
                    alt={`${place.title} ${index + 1}`}
                    width={120}
                    height={70}
                  />
                </button>
              ))}
            </div>
            <div className={scss.about}>
              <h2>About this destination</h2>
              <p>{place.description}</p>
            </div>
          </div>
          <aside className={scss.sidebar}>
            <div className={scss.infoCard}>
              <div className={scss.topInfo}>
                <span className={scss.type}>{place.type}</span>
                <span className={scss.rating}>
                  ★ {Number(place.rating).toFixed(1)}
                </span>
              </div>
              <h1>{place.title}</h1>
              <div className={scss.location}>
                <span>⌖</span>
                {place.city}
              </div>
              <div className={scss.divider} />
              <span className={scss.priceLabel}>STARTING FROM</span>
              <div className={scss.price}>
                ${place.price}
                <span>/ night</span>
              </div>
              {isBooked ? (
                <button type="button" className={scss.wishlistButton} disabled>
                  ✓ Already Booked
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleBookNow}
                  className={scss.bookButton}
                >
                  Book Now
                </button>
              )}
              <button
                type="button"
                className={`${scss.wishlistButton} ${
                  isSaved ? scss.saved : ""
                }`}
                onClick={handleWishlist}
              >
                {isSaved ? "✓ Saved to Wishlist" : "♡ Save to Wishlist"}
              </button>
            </div>
            <div className={scss.authorCard}>
              <span className={scss.publishedLabel}>PUBLISHED BY</span>
              <div className={scss.author}>
                <div className={scss.authorAvatar}>
                  <UserAvatar name={place.author_name} />
                </div>
                <div>
                  <strong>{place.author_name}</strong>
                  <span>
                    Published{" "}
                    {new Date(place.created_at).toLocaleDateString("en-US", {
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
      {showAuthModal && (
        <div
          className={scss.modalOverlay}
          onClick={() => setShowAuthModal(false)}
        >
          <div
            className={scss.modal}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className={scss.closeButton}
              onClick={() => setShowAuthModal(false)}
            >
              ×
            </button>
            <div className={scss.authIcon}>🔐</div>
            <h2>Sign in to book</h2>
            <p>
              Please sign in to your account or create a new account to book
              this destination.
            </p>
            <div className={scss.modalActions}>
              <Link
                href="/login"
                className={scss.viewWishlistButton}
                onClick={() => setShowAuthModal(false)}
              >
                Sign In
              </Link>
              <Link
                href="/register"
                className={scss.continueButton}
                onClick={() => setShowAuthModal(false)}
              >
                Create Account
              </Link>
            </div>
          </div>
        </div>
      )}
      {showModal && (
        <div className={scss.modalOverlay} onClick={() => setShowModal(false)}>
          <div
            className={scss.modal}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className={scss.closeButton}
              onClick={() => setShowModal(false)}
            >
              ×
            </button>
            <div className={scss.successIcon}>✓</div>
            <h2>Added to Wishlist!</h2>
            <p>
              <strong>{place.title}</strong> has been added to your wishlist.
            </p>
            <div className={scss.modalActions}>
              <Link
                href="/wishlist"
                className={scss.viewWishlistButton}
                onClick={() => setShowModal(false)}
              >
                View Wishlist
              </Link>
              <button
                type="button"
                className={scss.continueButton}
                onClick={() => setShowModal(false)}
              >
                Continue Browsing
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default DetailTop;
