import Link from "next/link";
import scss from "./detailTop.module.scss";
import { IPlaceResult } from "@/hooks/types/placesTypes";

interface IDetailTop {
  place: IPlaceResult
}

const DetailTop = ({place}: IDetailTop) => {
  return (
    <section className={scss.container}>
      <div className="container">
        {/* Breadcrumbs */}
        <div className={scss.breadcrumbs}>
          <Link href="/">Home</Link>
          <span>›</span>
          <span>Kyoto Temple Walk</span>
        </div>

        <div className={scss.mainContainer}>
          {/* LEFT */}
          <div className={scss.leftSide}>
            {/* Main image */}
            <div className={scss.mainImage}>
              <img src="/travel-banner.avif" alt="Kyoto Temple Walk" />
            </div>

            {/* Gallery */}
            <div className={scss.gallery}>
              <button>
                <img src="/travel-banner.avif" alt="Kyoto" />
              </button>

              <button>
                <img src="/login-bg.avif" alt="Kyoto" />
              </button>

              <button>
                <img src="/mortgage.avif" alt="Kyoto Temple" />
              </button>

              <button>
                <img src="/register-bg.avif" alt="Kyoto" />
              </button>
            </div>

            {/* About */}
            <div className={scss.about}>
              <h2>About this destination</h2>

              <p>
                Kyoto is Japan&apos;s cultural soul — a city where ancient
                wooden temples sit beside bamboo groves, where geisha still
                glide through cobblestone lanes at dusk, and where every season
                transforms the landscape into something new.
              </p>

              <p>
                Walk the famous Philosopher&apos;s Path in spring when cherry
                blossoms form a canopy overhead, or visit Fushimi Inari for a
                meditative hike through thousands of vermilion torii gates.
              </p>
            </div>
          </div>

          {/* RIGHT */}
          <aside className={scss.sidebar}>
            <div className={scss.infoCard}>
              <div className={scss.topInfo}>
                <span className={scss.type}>Culture</span>

                <span className={scss.rating}>★ 4.8</span>
              </div>

              <h1>Kyoto Temple Walk</h1>

              <div className={scss.location}>
                <span>⌖</span>
                Kyoto, Japan
              </div>

              <div className={scss.divider} />

              <span className={scss.priceLabel}>STARTING FROM</span>

              <div className={scss.price}>
                $180
                <span>/ night</span>
              </div>

              <button className={scss.bookButton}>Book Now</button>

              <button className={scss.wishlistButton}>Save to Wishlist</button>
            </div>

            {/* Author */}
            <div className={scss.authorCard}>
              <span className={scss.publishedLabel}>PUBLISHED BY</span>

              <div className={scss.author}>
                <img src="/images/avatar.jpg" alt="Yuki Tanaka" />

                <div>
                  <strong>Yuki Tanaka</strong>
                  <span>Published April 2025</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default DetailTop;
