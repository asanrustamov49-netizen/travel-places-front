"use client";

import { useState } from "react";
import Link from "next/link";
import scss from "./detailTop.module.scss";
import { IPlaceResult } from "@/hooks/types/placesTypes";
import { useWishList } from "@/hooks/functions/useWishList";

interface IDetailTop {
  place: IPlaceResult;
}

const DetailTop = ({ place }: IDetailTop) => {
  const [showModal, setShowModal] = useState(false);
  const { addToWishList, wishList } = useWishList();
  const isSaved = wishList.some((item) => item.id === place.id);
  const handleWishlist = () => {
    if (isSaved) return;
    addToWishList(place);
    setShowModal(true);
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
              <img
                src={place.image || "/travel-banner.avif"}
                alt={place.title}
              />
            </div>

            <div className={scss.gallery}>
              <button type="button">
                <img
                  src={place.image || "/travel-banner.avif"}
                  alt={place.title}
                />
              </button>

              <button type="button">
                <img src="/login-bg.avif" alt={place.title} />
              </button>

              <button type="button">
                <img src="/mortgage.avif" alt={place.title} />
              </button>

              <button type="button">
                <img src="/register-bg.avif" alt={place.title} />
              </button>
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

                <span className={scss.rating}>★ {place.rating}</span>
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

              <button type="button" className={scss.bookButton}>
                Book Now
              </button>

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
                <div className={scss.authorAvatar}>Y</div>

                <div>
                  <strong>Yuki Tanaka</strong>
                  <span>Published April 2025</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

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
