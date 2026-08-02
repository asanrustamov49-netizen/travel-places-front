import Link from "next/link";
import scss from "./moreDestinations.module.scss";
import HomeCards from "@/components/ui/homeCards/HomeCards";
import DetailCards from "@/components/ui/detailCards/DetailCards";

const MoreDestinations = () => {
  const destinations = [
    {
      id: 1,
      title: "Amalfi Coast Escape",
      city: "Amalfi, Italy",
      type: "Beach",
      price: 320,
      rating: 4.9,
      image: "/images/amalfi.jpg",
    },
    {
      id: 2,
      title: "Santorini Sunset",
      city: "Oia, Greece",
      type: "Beach",
      price: 410,
      rating: 4.9,
      image: "/images/santorini.jpg",
    },
    {
      id: 3,
      title: "Patagonia Trek",
      city: "El Chaltén, Argentina",
      type: "Adventure",
      price: 250,
      rating: 4.7,
      image: "/images/patagonia.jpg",
    },
  ];

  return (
    <section className={scss.container}>
      <div className="container">
        <div className={scss.mainContainer}>
          <div className={scss.header}>
            <h2>More Destinations</h2>

            <Link href="/#destinations">View all</Link>
          </div>

          <DetailCards />
        </div>
      </div>
    </section>
  );
};

export default MoreDestinations;
