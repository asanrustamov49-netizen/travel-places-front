import DetailTop from "@/components/widgets/detailTop/DetailTop";
import scss from "./detail.module.scss";
import DetailRating from "@/components/widgets/detailRating/DetailRating";
import MoreDestinations from "@/components/widgets/moreDestinations/MoreDestinations";
import { useParams } from "next/navigation";
import { useGetOnePlace } from "@/hooks/functions/places/useGetOnePlace";

const Detail = () => {
  const { params } = useParams();
  const { data: place } = useGetOnePlace(Number(params));
  return (
    <div>
      <DetailTop place={place!}/>
      <DetailRating placeId={Number(place?.id)} />
      <MoreDestinations />
    </div>
  );
};

export default Detail;
