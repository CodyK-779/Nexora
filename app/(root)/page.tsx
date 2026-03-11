import FeaturedCategories from "@/components/FeaturedCategories";
import HeroSection from "@/components/HeroSection";
import { NewsLetter } from "@/components/NewsLetter";
import PopularAndLatestWrapper from "@/components/PopularAndLatestWrapper";
import Testimonials from "@/components/Testimonials";
import { TrustBadges } from "@/components/TrustBadges";

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturedCategories />
      <PopularAndLatestWrapper />
      <TrustBadges />
      <Testimonials />
      <NewsLetter />
    </>
  );
}
