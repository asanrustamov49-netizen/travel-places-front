import Link from "next/link";
import scss from "./detailCards.module.scss";
import { IPlaceResult } from "@/hooks/types/placesTypes";

interface IDetailCards {
  destinations: IPlaceResult[];
}

const DetailCards = ({ destinations }: IDetailCards) => {
  return (
    <div className={scss.cards}>
      {destinations.map((destination) => (
        <Link
          href={`/detail/${destination.id}`}
          className={scss.card}
          key={destination.id}
        >
          <div className={scss.image}>
            <img
              src={destination.image?.image_url || "/register-bg.avif"}
              alt={destination.title}
            />
          </div>
          <div className={scss.content}>
            <h3>{destination.title}</h3>
            <p>
              <span>⌖</span>
              {destination.country_name}, {destination.city}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default DetailCards;
