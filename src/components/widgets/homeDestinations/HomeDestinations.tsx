"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import scss from "./homeDestinations.module.scss";
import HomeCards from "@/components/ui/homeCards/HomeCards";
import { IPlaceResult } from "@/hooks/types/placesTypes";
import { useGetPlaces } from "@/hooks/places/useGetPlaces";

const TEMP_PLACES: IPlaceResult[] = [
  {
    id: "1",
    title: "Amalfi Coast Escape",
    image: "/images/amalfi.jpg",
    country_id: "Amalfi, Italy",
    type: "Beach",
    price: 320,
    rating: 4.9,
    description:
      "Dramatic cliffs, pastel villages, and the bluest sea on the Italian Riviera.",
  },
  {
    id: "2",
    title: "Kyoto Temple Walk",
    image: "/travel-banner.avif",
    country_id: "Kyoto, Japan",
    type: "Culture",
    price: 180,
    rating: 4.8,
    description:
      "Ancient temples, bamboo groves, and timeless Japanese culture.",
  },
  {
    id: "3",
    title: "Santorini Sunset",
    image: "/register-bg.avif",
    country_id: "Oia, Greece",
    type: "Beach",
    price: 410,
    rating: 4.9,
    description:
      "White-washed villages, blue domes, and legendary Caldera sunsets.",
  },
  {
    id: "4",
    title: "Patagonia Trek",
    image: "/login-bg.avif",
    country_id: "El Chaltén, Argentina",
    type: "Adventure",
    price: 250,
    rating: 4.7,
    description:
      "Jagged peaks, turquoise lakes, and wild Patagonian wilderness.",
  },
  {
    id: "5",
    title: "Marrakech Medina",
    image: "/mortgage.avif",
    country_id: "Marrakech, Morocco",
    type: "Culture",
    price: 140,
    rating: 4.6,
    description:
      "Labyrinthine souks, ornate riads, and the vibrant pulse of North Africa.",
  },
  {
    id: "6",
    title: "Banff National Park",
    image: "/images/banff.jpg",
    country_id: "Banff, Canada",
    type: "Nature",
    price: 195,
    rating: 4.8,
    description:
      "Turquoise glacial lakes framed by the towering Canadian Rockies.",
  },
  {
    id: "7",
    title: "New York City Escape",
    image: "/images/new-york.jpg",
    country_id: "New York, USA",
    type: "City",
    price: 290,
    rating: 4.7,
    description:
      "Skyscrapers, iconic streets, endless entertainment, and city lights.",
  },
  {
    id: "8",
    title: "Bali Tropical Escape",
    image: "/images/bali.jpg",
    country_id: "Bali, Indonesia",
    type: "Nature",
    price: 220,
    rating: 4.8,
    description:
      "Tropical beaches, green rice terraces, waterfalls, and peaceful temples.",
  },
];

const categories = ["All", "Beach", "Culture", "Adventure", "Nature", "City"];

const HomeDestinations = () => {
  // const {data: places} = useGetPlaces()
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(1);

  const filteredPlaces = useMemo(() => {
    let result = [...TEMP_PLACES];

    // Фильтр по категории
    if (category !== "All") {
      result = result.filter((place) => place.type === category);
    }

    // Сортировка
    switch (sort) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;

      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;

      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;

      case "alphabetical":
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;

      case "newest":
      default:
        // Пока оставляем исходный порядок.
        break;
    }

    return result;
  }, [category, sort]);

  return (
    <section id="destinations" className={scss.container}>
      <div className="container">
        <div className={scss.mainContainer}>
          {/* TOP */}
          <div className={scss.top}>
            <div className={scss.heading}>
              <h2>
                All Destinations <span>({filteredPlaces.length})</span>
              </h2>
            </div>

            <div className={scss.controls}>
              {/* CATEGORIES */}
              <div className={scss.categories}>
                {categories.map((item) => (
                  <button
                    key={item}
                    className={category === item ? scss.active : ""}
                    onClick={() => {
                      setCategory(item);
                      setPage(1);
                    }}
                  >
                    {item}
                  </button>
                ))}
              </div>

              {/* SORT */}
              <select
                value={sort}
                onChange={(e) => {
                  setSort(e.target.value);
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

          {/* CARDS */}
          {filteredPlaces.length > 0 ? (
            <div className={scss.grid}>
              {filteredPlaces.map((place) => (
                <HomeCards key={place.id} place={place} />
              ))}
            </div>
          ) : (
            <div className={scss.empty}>
              <h3>No destinations found</h3>

              <p>Try another category.</p>
            </div>
          )}

          {/* PAGINATION */}
          <div className={scss.pagination}>
            <button
              className={scss.pageArrow}
              disabled={page === 1}
              onClick={() => setPage((prev) => Math.max(1, prev - 1))}
            >
              <ChevronLeft size={15} />
            </button>

            <button
              className={page === 1 ? scss.pageBtnActive : scss.pageBtn}
              onClick={() => setPage(1)}
            >
              1
            </button>

            <button
              className={page === 2 ? scss.pageBtnActive : scss.pageBtn}
              onClick={() => setPage(2)}
            >
              2
            </button>

            <button
              className={scss.pageArrow}
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
