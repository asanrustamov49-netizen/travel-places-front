import HomeBanner from "@/components/widgets/homeBanner/HomeBanner";
import scss from "./home.module.scss";
import HomeDestinations from "@/components/widgets/homeDestinations/HomeDestinations";
import Mortgage from "@/components/widgets/mortgage/Mortgage";
import DetailRating from "@/components/widgets/detailRating/DetailRating";

const Home = () => {
  return (
    <div>
      <HomeBanner />
      <HomeDestinations />
      <Mortgage />
    </div>
  );
};

export default Home;
