"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import scss from "./placesTable.module.scss";
import { IPlaceResult } from "@/hooks/types/placesTypes";
import { useState } from "react";
import { useDeletePlace } from "@/hooks/functions/places/useDeletePlace";

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

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState<IPlaceResult | null>(null);

  const deletePlace = useDeletePlace();

  const handleDelete = () => {
    if (!selectedPlace) return;

    deletePlace.mutate(selectedPlace.id, {
      onSuccess: () => {
        setIsDeleteOpen(false);
        setSelectedPlace(null);
      },
    });
  };

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
                          src={`http://localhost:5000${place.image.image_url}`}
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

                    {Number(place.rating).toFixed(1)}
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

                    <button
                      type="button"
                      className={scss.deleteBtn}
                      onClick={() => {
                        setSelectedPlace(place);
                        setIsDeleteOpen(true);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isDeleteOpen && selectedPlace && (
        <div className={scss.modalOverlay}>
          <div className={scss.modal}>
            <button
              type="button"
              className={scss.close}
              onClick={() => setIsDeleteOpen(false)}
            >
              ×
            </button>

            <div className={scss.deleteIcon}>!</div>

            <h2>Delete Place?</h2>

            <p className={scss.modalDescription}>
              Are you sure you want to delete{" "}
              <strong>{selectedPlace.title}</strong>? This action cannot be
              undone.
            </p>

            <div className={scss.modalActions}>
              <button
                type="button"
                className={scss.cancelBtn}
                onClick={() => setIsDeleteOpen(false)}
              >
                Cancel
              </button>

              <button
                type="button"
                className={scss.confirmDeleteBtn}
                onClick={handleDelete}
                disabled={deletePlace.isPending}
              >
                {deletePlace.isPending ? "Deleting..." : "Delete Place"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlacesTable;
