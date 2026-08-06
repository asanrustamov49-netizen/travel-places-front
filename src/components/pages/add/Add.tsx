"use client";
import { useRef, useState } from "react";
import scss from "./add.module.scss";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { ICreatePlaceBody } from "@/hooks/types/placesTypes";
import { useCreatePlace } from "@/hooks/functions/places/useCreatePlace";
import { PlaceSchema, placeSchema } from "@/validation/places.validate";

const CATEGORIES = ["Beach", "Culture", "Adventure", "Mountain", "City"];

const Add = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { push } = useRouter();
  const { mutate: createPlace } = useCreatePlace();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<PlaceSchema>({
    resolver: zodResolver(placeSchema),
  });
  const [photos, setPhotos] = useState<File[]>([]);

  const handleFilesSelect = (files: FileList | null) => {
    if (!files) return;
    setPhotos((prev) => [...prev, ...Array.from(files)]);
  };

  const handleData = (data: PlaceSchema) => {
    createPlace({
      title,
      description,
      city,
      type,
      price,
      country_id,
      user_id,
      images: photos,
    });
    reset();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    handleFilesSelect(e.dataTransfer.files);
  };

  return (
    <div id="add" className={scss.container}>
      <div className="container">
        <div className={scss.mainContainer}>
          <button
            type="button"
            onClick={() => push("/")}
            className={scss.backLink}
          >
            ← Back to Home
          </button>

          <h1 className={scss.title}>Add a New Place</h1>
          <p className={scss.subtitle}>
            Share a beautiful destination with the community.
          </p>

          <form onSubmit={handleSubmit(handleData)} className={scss.form}>
            <section className={scss.card}>
              <h2 className={scss.cardTitle}>Basic Information</h2>

              <div className={scss.field}>
                <label className={scss.label}>
                  Title <span className={scss.required}>*</span>
                </label>
                <input
                  {...register("title")}
                  type="text"
                  placeholder="e.g. Amalfi Coast Escape"
                  className={scss.input}
                />
              </div>

              <div className={scss.row}>
                <div className={scss.field}>
                  <label className={scss.label}>
                    Country <span className={scss.required}>*</span>
                  </label>
                  <input
                    {...register("country_id")}
                    type="number"
                    className={scss.input}
                  />
                </div>

                <div className={scss.field}>
                  <label className={scss.label}>
                    City <span className={scss.required}>*</span>
                  </label>
                  <input
                    {...register("city")}
                    type="text"
                    className={scss.input}
                  />
                </div>
              </div>

              <div className={scss.row}>
                <div className={scss.field}>
                  <label className={scss.label}>
                    Price per Night (USD){" "}
                    <span className={scss.required}>*</span>
                  </label>
                  <input
                    {...register("price", {
                      valueAsNumber: true,
                    })}
                    type="number"
                    className={scss.input}
                  />
                </div>

                <div className={scss.field}>
                  <label className={scss.label}>
                    Category <span className={scss.required}>*</span>
                  </label>
                  <select {...register("type")} className={scss.select}>
                    {CATEGORIES.map((cat) => (
                      <option key={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>
            </section>

            {/* --- Description --- */}
            <section className={scss.card}>
              <h2 className={scss.cardTitle}>Description</h2>

              <div className={scss.field}>
                <label className={scss.label}>
                  Description <span className={scss.required}>*</span>
                </label>
                <textarea
                  {...register("description")}
                  className={scss.textarea}
                />
              </div>
            </section>

            {/* --- Photos --- */}
            <section className={scss.card}>
              <h2 className={scss.cardTitle}>Photos</h2>

              <div
                className={scss.dropzone}
                onClick={() => fileInputRef.current?.click()}
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  multiple
                  hidden
                  onChange={(e) => handleFilesSelect(e.target.files)}
                />

                <span className={scss.dropzoneIcon}>📷</span>
                <span className={scss.dropzoneText}>
                  Click to upload photos
                </span>
                <span className={scss.dropzoneHint}>
                  PNG, JPG or WEBP — up to 10MB each
                </span>
              </div>

              {photos.length > 0 && (
                <div className={scss.photoList}>
                  {photos.map((file, i) => (
                    <span key={i} className={scss.photoChip}>
                      {file.name}
                    </span>
                  ))}
                </div>
              )}
            </section>

            {/* --- Footer --- */}
            <div className={scss.footer}>
              <button type="button" className={scss.cancelBtn}>
                Cancel
              </button>
              <button type="submit" className={scss.publishBtn}>
                Publish Place
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Add;
