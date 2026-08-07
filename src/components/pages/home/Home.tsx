import HomeBanner from "@/components/widgets/homeBanner/HomeBanner";
import scss from "./home.module.scss";
import HomeDestinations from "@/components/widgets/homeDestinations/HomeDestinations";

const Home = () => {
  return (
    <div>
      <HomeBanner />
      <HomeDestinations />
    </div>
  );
};

export default Home;
