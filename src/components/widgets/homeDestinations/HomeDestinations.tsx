"use client";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo, useState } from "react";
import scss from "./homeDestinations.module.scss";
import HomeCards from "@/components/ui/homeCards/HomeCards";

const places = [
  {
    id: 1,
    image: "/images/amalfi.jpg",
    type: "Beach",
    rating: 4.9,
    title: "Amalfi Coast Escape",
    location: "Amalfi, Italy",
    description:
      "Dramatic cliffs, pastel villages, and the bluest sea on the Italian Riviera.",
    price: 320,
    createdAt: 8,
  },
  {
    id: 2,
    image: "/images/kyoto.jpg",
    type: "Culture",
    rating: 4.8,
    title: "Kyoto Temple Walk",
    location: "Kyoto, Japan",
    description:
      "Ancient temples, bamboo groves, and timeless Japanese culture.",
    price: 180,
    createdAt: 7,
  },
  {
    id: 3,
    image: "/images/santorini.jpg",
    type: "Beach",
    rating: 4.9,
    title: "Santorini Sunset",
    location: "Oia, Greece",
    description:
      "White-washed villages, blue domes, and legendary caldera sunsets.",
    price: 410,
    createdAt: 6,
  },
  {
    id: 4,
    image: "/images/patagonia.jpg",
    type: "Adventure",
    rating: 4.7,
    title: "Patagonia Trek",
    location: "El Chalten, Argentina",
    description:
      "Jagged peaks, turquoise lakes, and wild Patagonian wilderness.",
    price: 250,
    createdAt: 5,
  },
  {
    id: 5,
    image: "/images/marrakech.jpg",
    type: "Culture",
    rating: 4.6,
    title: "Marrakech Medina",
    location: "Marrakech, Morocco",
    description:
      "Labyrinthine souks, ornate riads, and the vibrant pulse of North Africa.",
    price: 140,
    createdAt: 4,
  },
  {
    id: 6,
    image: "/images/banff.jpg",
    type: "Nature",
    rating: 4.8,
    title: "Banff National Park",
    location: "Banff, Canada",
    description:
      "Turquoise glacial lakes framed by the towering Canadian Rockies.",
    price: 195,
    createdAt: 3,
  },
];

const categories = ["All", "Beach", "Culture", "Adventure", "Nature", "City"];

const HomeDestinations = () => {
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(1);

  const filteredPlaces = useMemo(() => {
    let result = [...places];

    if (category !== "All") {
      result = result.filter((place) => place.type === category);
    }

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
        result.sort((a, b) => b.createdAt - a.createdAt);
    }

    return result;
  }, [category, sort]);

  return (
    <section className={scss.container}>
      <div className="container">
        <div className={scss.mainContainer}>
          <div className={scss.top}>
            <div className={scss.heading}>
              <h2>
                All Destinations <span>({filteredPlaces.length})</span>
              </h2>
            </div>

            <div className={scss.controls}>
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

          <div className={scss.grid}>
            {filteredPlaces.map((place) => (
              <HomeCards key={place.id} place={place} />
            ))}
          </div>

          {filteredPlaces.length === 0 && (
            <div className={scss.empty}>
              <h3>No destinations found</h3>
              <p>Try another category.</p>
            </div>
          )}

          <div className={scss.pagination}>
            <button disabled={page === 1} onClick={() => setPage(page - 1)}>
              <ChevronLeft size={16} />
            </button>

            <button className={scss.current}>1</button>

            <button onClick={() => setPage(2)}>2</button>

            <button onClick={() => setPage(page + 1)}>
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeDestinations;
