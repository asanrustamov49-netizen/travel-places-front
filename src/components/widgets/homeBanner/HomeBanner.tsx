import Link from "next/link";
import { Search, Sparkles } from "lucide-react";
import scss from "./homeBanner.module.scss";

const HomeBanner = () => {
  return (
    <section className={scss.container}>
      <div className={scss.overlay}>
        <div className="container">
          <div className={scss.mainContainer}>
            <div className={scss.content}>
              <div className={scss.badge}>
                <Sparkles size={15} />
                <span>Discover the World</span>
              </div>

              <h1>
                Find Your Next
                <span>Dream Destination</span>
              </h1>

              <p>
                Browse thousands of travel destinations shared by
                <br />
                explorers around the world.
              </p>

              <div className={scss.searchBox}>
                <div className={scss.searchInput}>
                  <Search size={21} />
                  <input
                    type="text"
                    placeholder="Search destinations, cities, countries..."
                  />
                </div>

                <Link href="/places" className={scss.button}>
                  Browse Places
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeBanner;
