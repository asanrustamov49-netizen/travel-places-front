"use client";
import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import scss from "./homeDestinations.module.scss";
import HomeCards from "@/components/ui/homeCards/HomeCards";
import { useGetPlaces } from "@/hooks/functions/places/useGetPlaces";
import { TSort, TypeSort } from "@/hooks/types/placesTypes";

const types = ["All", "Beach", "Culture", "Adventure", "Nature", "City"];

const HomeDestinations = () => {
  const [type, setType] = useState<TypeSort>("All");
  const limit = 6;
  const [search, setSearch] = useState<string>("");
  const [sort, setSort] = useState<TSort>("newest");
  const [page, setPage] = useState<number>(1);
  const { data } = useGetPlaces({
    page,
    limit,
    type: type === "All" ? undefined : type,
    sort,
    search,
  });
  const places = data?.data ?? [];
  const totalPages = data?.pagination.pages ?? 1;

  return (
    <section id="destinations" className={scss.container}>
      <div className="container">
        <div className={scss.mainContainer}>
          <div className={scss.top}>
            <div className={scss.heading}>
              <h2>
                All Destinations <span>({places.length})</span>
              </h2>
            </div>
            <div className={scss.controls}>
              <div className={scss.categories}>
                {types.map((item) => (
                  <button
                    key={item}
                    className={type === item ? scss.active : ""}
                    onClick={() => {
                      setType(item);
                      setPage(1);
                    }}
                  >
                    {item}
                  </button>
                ))}
              </div>
              <div className={scss.searchWrapper}>
                <svg
                  className={scss.searchIcon}
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <input
                  type="text"
                  placeholder="Search destinations..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                  }}
                  className={scss.searchInput}
                />
              </div>
              <select
                value={sort}
                onChange={(e) => {
                  setSort(e.target.value as TSort);
                  setPage(1);
                }}
                className={scss.sort}
              >
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low → High</option>
                <option value="price-high">Price: High → Low</option>
                <option value="rating">Highest Rated</option>
                <option value="alphabetical">A → Z</option>
              </select>
            </div>
          </div>
          {places.length > 0 ? (
            <div className={scss.grid}>
              {places.map((place) => (
                <HomeCards key={place.id} place={place} />
              ))}
            </div>
          ) : (
            <div className={scss.empty}>
              <h3>No destinations found</h3>
              <p>Try another category.</p>
            </div>
          )}
          <div className={scss.pagination}>
            <button
              className={scss.pageArrow}
              disabled={page === 1}
              onClick={() => setPage((prev) => prev - 1)}
            >
              <ChevronLeft size={15} />
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                className={
                  page === index + 1 ? scss.pageBtnActive : scss.pageBtn
                }
                onClick={() => setPage(index + 1)}
              >
                {index + 1}
              </button>
            ))}
            <button
              className={scss.pageArrow}
              disabled={page === totalPages}
              onClick={() => setPage((prev) => prev + 1)}
            >
              <ChevronRight size={15} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeDestinations;
