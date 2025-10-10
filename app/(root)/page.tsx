import FeaturedCategories from "@/components/FeaturedCategories";
import HeroSection from "@/components/HeroSection";
import LatestProductSection from "@/components/LatestProductSection";
import { NewsLetter } from "@/components/NewsLetter";
import PopularProducts from "@/components/PopularProducts";
import Testimonials from "@/components/Testimonials";
import { TrustBadges } from "@/components/TrustBadges";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturedCategories />
      <PopularProducts />
      <LatestProductSection />
      <TrustBadges />
      <Testimonials />
      <NewsLetter />
    </>
  );
}
