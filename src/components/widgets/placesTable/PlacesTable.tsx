"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import scss from "./placesTable.module.scss";
import { IPlaceResult } from "@/hooks/types/placesTypes";

interface PlacesTableProps {
  places: IPlaceResult[];
}

const categoryClass: Record<
  "Beach" | "Culture" | "Adventure" | "Nature" | "City",
  string
> = {
  Beach: scss.badgeBeach,
  Culture: scss.badgeCulture,
  Adventure: scss.badgeAdventure,
  Nature: scss.badgeNature,
  City: scss.badgeCity,
};

const PlacesTable = ({ places }: PlacesTableProps) => {
  const { push } = useRouter();
  return (
    <div className={scss.wrapper}>
      <div className={scss.tableWrapper}>
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
            {places.map((place) => (
              <tr key={place.id}>
                <td>
                  <div className={scss.placeCell}>
                    <div className={scss.imageWrapper}>
                      {place.image ? (
                        <Image
                          src={place.image}
                          alt={place.title}
                          fill
                          className={scss.image}
                        />
                      ) : (
                        <div className={scss.noImage}>No image</div>
                      )}
                    </div>
                    <span className={scss.name}>{place.title}</span>
                  </div>
                </td>
                <td className={scss.location}>
                  {place.country_name}, {place.city}
                </td>
                <td>
                  <span
                    className={`${scss.badge} ${categoryClass[place.type]}`}
                  >
                    {place.type}
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
                    {place.rating ?? "—"}
                  </span>
                </td>
                <td className={scss.author}>
                  {place.author_name ?? "Unknown"}
                </td>
                <td>
                  <div className={scss.actions}>
                    <button
                      type="button"
                      className={scss.viewBtn}
                      onClick={() => push(`/detail/${place.id}`)}
                    >
                      View
                    </button>
                    <button
                      type="button"
                      className={scss.editBtn}
                      onClick={() => push(`/edit/${place.id}`)}
                    >
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
      </div>
    </div>
  );
};

export default PlacesTable;
