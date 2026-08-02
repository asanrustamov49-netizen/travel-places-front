import Link from "next/link";
import scss from "./detailCards.module.scss";

const DetailCards = () => {
  const destinations = [
    {
      id: 1,
      title: "Amalfi Coast Escape",
      location: "Amalfi, Italy",
      image: "/images/amalfi.jpg",
    },
    {
      id: 2,
      title: "Santorini Sunset",
      location: "Oia, Greece",
      image: "/images/santorini.jpg",
    },
    {
      id: 3,
      title: "Patagonia Trek",
      location: "El Chaltén, Argentina",
      image: "/images/patagonia.jpg",
    },
  ];

  return (
    <div className={scss.cards}>
      {destinations.map((destination) => (
        <Link
          href={`/detail/${destination.id}`}
          className={scss.card}
          key={destination.id}
        >
          <div className={scss.image}>
            <img src={destination.image} alt={destination.title} />
          </div>

          <div className={scss.content}>
            <h3>{destination.title}</h3>

            <p>
              <span>⌖</span>
              {destination.location}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default DetailCards;
