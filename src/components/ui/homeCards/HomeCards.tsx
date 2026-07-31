import Image from "next/image";
import Link from "next/link";
import { MapPin, Star } from "lucide-react";
import scss from "./homeCards.module.scss";

interface Place {
  id: number;
  image: string;
  type: string;
  rating: number;
  title: string;
  location: string;
  description: string;
  price: number;
}

interface HomeCardsProps {
  place: Place;
}

const HomeCards = ({ place }: HomeCardsProps) => {
  return (
    <article className={scss.card}>
      <div className={scss.imageWrapper}>
        <Image
          src={place.image}
          alt={place.title}
          fill
          className={scss.image}
        />

        <span className={scss.type}>{place.type}</span>

        <span className={scss.rating}>
          <Star size={13} fill="currentColor" />
          {place.rating}
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
          <span>{place.location}</span>
        </div>

        <p>{place.description}</p>

        <Link href={`/places/${place.id}`} className={scss.button}>
          View Details
        </Link>
      </div>
    </article>
  );
};

export default HomeCards;
