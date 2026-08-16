"use client";
import Link from "next/link";
import scss from "./moreDestinations.module.scss";
import DetailCards from "@/components/ui/detailCards/DetailCards";
import { useGetPlaces } from "@/hooks/functions/places/useGetPlaces";

const MoreDestinations = () => {
  const { data, isLoading, isError } = useGetPlaces({
    page: 1,
    limit: 3,
    sort: "newest",
  });

  if (isLoading) return <p>Loading destinations...</p>;
  if (isError) return <p>Failed to load destinations.</p>;

  return (
    <section className={scss.container}>
      <div className="container">
        <div className={scss.mainContainer}>
          <div className={scss.header}>
            <h2>More Destinations</h2>
            <Link href="/#destinations">View all</Link>
          </div>
          <DetailCards destinations={data?.data ?? []} />
        </div>
      </div>
    </section>
  );
};

export default MoreDestinations;
