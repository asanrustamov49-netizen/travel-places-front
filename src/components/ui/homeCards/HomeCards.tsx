import Image from "next/image";
import Link from "next/link";
import { MapPin, Star } from "lucide-react";
import scss from "./homeCards.module.scss";
import { IPlaceResult } from "@/hooks/types/placesTypes";

interface HomeCardsProps {
  place: IPlaceResult;
}

const HomeCards = ({ place }: HomeCardsProps) => {
  const description = place.description ?? "";
  const descriptionPreview = description.split(/\s+/).slice(0, 20).join(" ");
  const hasMoreDescription = description.trim().split(/\s+/).length > 20;
  return (
    <article className={scss.card}>
      <div className={scss.imageWrapper}>
        <Image
          src={
            place.image?.image_url
              ? `https://travel-places-backend.onrender.com${place.image.image_url}`
              : "/no-image.jpg"
          }
          alt={place.title}
          fill
          unoptimized
          className={scss.image}
        />
        <span className={scss.type}>{place.type}</span>
        <span className={scss.rating}>
          <Star size={13} fill="currentColor" />
          {Number(place.rating).toFixed(1)}
        </span>
      </div>
      <div className={scss.content}>
        <div className={scss.titleRow}>
          <h3>{place.title}</h3>
          <div className={scss.price}>
            <strong>${place.price}</strong>
            <span>/night</span>
          </div>
        </div>
        <div className={scss.location}>
          <MapPin size={14} />
          <span>
            {place.country_name}, {place.city}
          </span>
        </div>
        <p>
          {descriptionPreview}
          {hasMoreDescription && "..."}
        </p>
        <Link href={`/detail/${place.id}`} className={scss.button}>
          View Details
        </Link>
      </div>
    </article>
  );
};

export default HomeCards;
