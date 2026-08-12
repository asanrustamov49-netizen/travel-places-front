"use client";
import DetailTop from "@/components/widgets/detailTop/DetailTop";
import scss from "./detail.module.scss";
import DetailRating from "@/components/widgets/detailRating/DetailRating";
import MoreDestinations from "@/components/widgets/moreDestinations/MoreDestinations";
import { useParams } from "next/navigation";
import { useGetOnePlace } from "@/hooks/functions/places/useGetOnePlace";

const Detail = () => {
  const { id } = useParams();
  const placeId = Number(id);
  const { data: place, isLoading, isError } = useGetOnePlace(placeId);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError || !place) {
    return <div>Place not found</div>;
  }

  return (
    <div>
      <DetailTop place={place} />
      <DetailRating placeId={place.id} />
      <MoreDestinations />
    </div>
  );
};

export default Detail;
