"use client";
import Link from "next/link";
import scss from "./wishlist.module.scss";
import HomeCards from "@/components/ui/homeCards/HomeCards";
import { useWishList } from "@/hooks/functions/useWishList";

const Wishlist = () => {
  const { wishList, removeFromWishList, removeAllWishList } = useWishList();
  return (
    <section className={scss.container}>
      <div className="container">
        <div className={scss.mainContainer}>
          <div className={scss.top}>
            <div>
              <h1 className={scss.title}>My Wishlist</h1>

              <p className={scss.subtitle}>
                Your favorite destinations in one place.
              </p>
            </div>

            {wishList.length > 0 && (
              <button
                type="button"
                className={scss.removeAll}
                onClick={removeAllWishList}
              >
                Remove all
              </button>
            )}
          </div>

          <div className={scss.info}>
            <span>
              {wishList.length}{" "}
              {wishList.length === 1 ? "destination" : "destinations"}
            </span>
          </div>

          {wishList.length > 0 ? (
            <div className={scss.grid}>
              {wishList.map((place) => (
                <div key={place.id} className={scss.cardWrapper}>
                  <HomeCards place={place} />

                  <button
                    type="button"
                    className={scss.removeBtn}
                    onClick={() => removeFromWishList(place.id)}
                  >
                    Remove from wishlist
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className={scss.empty}>
              <div className={scss.emptyIcon}>♡</div>

              <h2>Your wishlist is empty</h2>

              <p>Save destinations you love and they will appear here.</p>

              <Link href="/#destinations" className={scss.browseBtn}>
                Browse destinations
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Wishlist;
