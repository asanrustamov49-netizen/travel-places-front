"use client";
import { useEffect, useRef, useState } from "react";
import scss from "./edit.module.scss";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useUpdatePlace } from "@/hooks/functions/places/useUpdatePlace";
import {
  createPlaceSchema,
  CreatePlaceSchema,
} from "@/validation/places.validate";
import { useGetCountries } from "@/hooks/functions/countries/useGetCountries";
import { useGetOnePlace } from "@/hooks/functions/places/useGetOnePlace";

const CATEGORIES = ["Beach", "Culture", "Adventure", "Nature", "City"];

const Edit = () => {
  const { id } = useParams<{ id: string }>();
  const placeId = Number(id);
  const { data: place, isLoading, isError } = useGetOnePlace(placeId);
  const { data: COUNTRIES } = useGetCountries();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { push } = useRouter();
  const { mutateAsync: updatePlace, isPending } = useUpdatePlace();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<CreatePlaceSchema>({
    resolver: zodResolver(createPlaceSchema),
  });
  const [photos, setPhotos] = useState<File[]>([]);

  const handleFilesSelect = (files: FileList | null) => {
    if (!files) return;
    setPhotos((prev) => [...prev, ...Array.from(files)]);
  };

  const handleData = async (data: CreatePlaceSchema) => {
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("city", data.city);
    formData.append("type", data.type);
    formData.append("country_id", String(data.country_id));
    formData.append("price", String(data.price));

    photos.forEach((photo) => {
      formData.append("images", photo);
    });

    try {
      await updatePlace({ id: placeId, body: formData});
      reset();
      setPhotos([]);
      push("/admin");
    } catch (error) {
      console.error("Failed to update place:", error);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    handleFilesSelect(e.dataTransfer.files);
  };

  useEffect(() => {
    if (!place) return;
    reset({
      title: place.title,
      description: place.description,
      city: place.city,
      type: place.type,
      country_id: place.country_id,
      price: Number(place.price),
    });
  }, [place, reset]);

  if (isLoading) {
    return <div className={scss.container}>Loading place...</div>;
  }

  if (isError || !place) {
    return <div className={scss.container}>Failed to load place.</div>;
  }

  return (
    <div className={scss.container}>
      <div className={scss.mainContainer}>
        <button
          type="button"
          onClick={() => push("/")}
          className={scss.backLink}
        >
          ← Back to Home
        </button>

        <h1 className={scss.title}>Edit Place</h1>
        <p className={scss.subtitle}>Update this destination's information.</p>

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
                className={`${scss.input} ${errors.title ? scss.errorInput : ""}`}
              />

              {errors.title && (
                <span className={scss.error}>{errors.title.message}</span>
              )}
            </div>

            <div className={scss.row}>
              <div className={scss.field}>
                <label className={scss.label}>
                  Country <span className={scss.required}>*</span>
                </label>

                <select
                  {...register("country_id", {
                    valueAsNumber: true,
                  })}
                  className={`${scss.select} ${
                    errors.country_id ? scss.errorInput : ""
                  }`}
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select a country
                  </option>

                  {COUNTRIES?.map((country) => (
                    <option key={country.id} value={country.id}>
                      {country.name}
                    </option>
                  ))}
                </select>

                {errors.country_id && (
                  <span className={scss.error}>
                    {errors.country_id.message}
                  </span>
                )}
              </div>

              <div className={scss.field}>
                <label className={scss.label}>
                  City <span className={scss.required}>*</span>
                </label>

                <input
                  {...register("city")}
                  type="text"
                  className={`${scss.input} ${errors.city ? scss.errorInput : ""}`}
                />

                {errors.city && (
                  <span className={scss.error}>{errors.city.message}</span>
                )}
              </div>
            </div>

            <div className={scss.row}>
              <div className={scss.field}>
                <label className={scss.label}>
                  Price per Night (USD)
                  <span className={scss.required}>*</span>
                </label>

                <input
                  {...register("price", {
                    valueAsNumber: true,
                  })}
                  type="number"
                  className={`${scss.input} ${errors.price ? scss.errorInput : ""}`}
                />

                {errors.price && (
                  <span className={scss.error}>{errors.price.message}</span>
                )}
              </div>

              <div className={scss.field}>
                <label className={scss.label}>
                  Category <span className={scss.required}>*</span>
                </label>

                <select
                  {...register("type")}
                  className={`${scss.select} ${
                    errors.type ? scss.errorInput : ""
                  }`}
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat}>{cat}</option>
                  ))}
                </select>

                {errors.type && (
                  <span className={scss.error}>{errors.type.message}</span>
                )}
              </div>
            </div>
          </section>

          <section className={scss.card}>
            <h2 className={scss.cardTitle}>Description</h2>

            <div className={scss.field}>
              <label className={scss.label}>
                Description <span className={scss.required}>*</span>
              </label>

              <textarea
                {...register("description")}
                className={`${scss.textarea} ${
                  errors.description ? scss.errorInput : ""
                }`}
              />

              {errors.description && (
                <span className={scss.error}>{errors.description.message}</span>
              )}
            </div>
          </section>

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
              <span className={scss.dropzoneText}>Click to upload photos</span>
              <span className={scss.dropzoneHint}>
                PNG, JPG or WEBP — up to 10MB each
              </span>
            </div>

            {photos.length > 0 && (
              <div className={scss.photoList}>
                {photos.map((item, idx) => (
                  <span key={idx} className={scss.photoChip}>
                    {item.name}
                  </span>
                ))}
              </div>
            )}
          </section>

          <div className={scss.footer}>
            <button
              type="button"
              className={scss.cancelBtn}
              onClick={() => push("/admin")}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={scss.publishBtn}
              disabled={isPending}
            >
              {isPending ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Edit;
