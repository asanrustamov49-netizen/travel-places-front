"use client";

import { useState } from "react";
import scss from "./placesTable.module.scss";
import { useRouter } from "next/navigation";

type Place = {
  id: string;
  name: string;
  image: string;
  location: string;
  category: "Beach" | "Culture" | "Adventure";
  price: number;
  rating: number;
  author: string;
};

const PLACES: Place[] = [
  {
    id: "1",
    name: "Amalfi Coast Escape",
    image: "/images/amalfi.jpg",
    location: "Amalfi, Italy",
    category: "Beach",
    price: 320,
    rating: 4.9,
    author: "Marco Esposito",
  },
  {
    id: "2",
    name: "Kyoto Temple Walk",
    image: "/images/kyoto.jpg",
    location: "Kyoto, Japan",
    category: "Culture",
    price: 180,
    rating: 4.8,
    author: "Yuki Tanaka",
  },
  {
    id: "3",
    name: "Santorini Sunset",
    image: "/images/santorini.jpg",
    location: "Oia, Greece",
    category: "Beach",
    price: 410,
    rating: 4.9,
    author: "Elena Papadopoulos",
  },
  {
    id: "4",
    name: "Patagonia Trek",
    image: "/images/patagonia.jpg",
    location: "El Chaltén, Argentina",
    category: "Adventure",
    price: 250,
    rating: 4.7,
    author: "Lucia Fernández",
  },
  {
    id: "5",
    name: "Marrakech Medina",
    image: "",
    location: "Marrakech, Morocco",
    category: "Culture",
    price: 140,
    rating: 4.6,
    author: "Amina Bensalem",
  },
];

const TOTAL_PAGES = 2;

const categoryClass: Record<Place["category"], string> = {
  Beach: scss.badgeBeach,
  Culture: scss.badgeCulture,
  Adventure: scss.badgeAdventure,
};

const PlacesTable = () => {
  const [page, setPage] = useState(1);
  const { push } = useRouter();
  return (
    <div className={scss.wrapper}>
      <table className={scss.table}>
        <thead>
          <tr>
            <th>Place</th>
            <th>Location</th>
            <th>Category</th>
            <th>Price</th>
            <th>Rating</th>
            <th>Author</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {PLACES.map((place) => (
            <tr key={place.id}>
              <td>
                <div className={scss.placeCell}>
                  <div className={scss.thumb}>
                    {place.image ? (
                      <img src={place.image} alt={place.name} />
                    ) : (
                      <div className={scss.thumbFallback} />
                    )}
                  </div>
                  <span className={scss.placeName}>{place.name}</span>
                </div>
              </td>

              <td className={scss.location}>{place.location}</td>

              <td>
                <span
                  className={`${scss.badge} ${categoryClass[place.category]}`}
                >
                  {place.category}
                </span>
              </td>

              <td className={scss.price}>${place.price}/night</td>

              <td>
                <span className={scss.rating}>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  {place.rating}
                </span>
              </td>

              <td className={scss.author}>{place.author}</td>

              <td>
                <div className={scss.actions}>
                  <button
                    onClick={() => push(`/detail/${place.id}`)}
                    type="button"
                    className={scss.viewBtn}
                  >
                    View
                  </button>
                  <button type="button" className={scss.editBtn}>
                    Edit
                  </button>
                  <button type="button" className={scss.deleteBtn}>
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className={scss.footer}>
        <span className={scss.resultsInfo}>
          Showing 1–{PLACES.length} of {PLACES.length + 3} results
        </span>

        <div className={scss.pagination}>
          <button
            type="button"
            className={scss.pageArrow}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            ←
          </button>

          {Array.from({ length: TOTAL_PAGES }, (_, i) => i + 1).map((num) => (
            <button
              key={num}
              type="button"
              className={`${scss.pageBtn} ${
                page === num ? scss.pageBtnActive : ""
              }`}
              onClick={() => setPage(num)}
            >
              {num}
            </button>
          ))}

          <button
            type="button"
            className={scss.pageArrow}
            onClick={() => setPage((p) => Math.min(TOTAL_PAGES, p + 1))}
            disabled={page === TOTAL_PAGES}
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlacesTable;
