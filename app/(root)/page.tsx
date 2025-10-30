import FeaturedCategories from "@/components/FeaturedCategories";
import HeroSection from "@/components/HeroSection";
import LatestProductSection from "@/components/LatestProductSection";
import { NewsLetter } from "@/components/NewsLetter";
import PopularProducts from "@/components/PopularProducts";
import LatestProductSkeleton from "@/components/skeletons/LatestProductSkeleton";
import PopularProductsSkele from "@/components/skeletons/PopularProductsSkeleton";
import Testimonials from "@/components/Testimonials";
import { TrustBadges } from "@/components/TrustBadges";
import { Suspense } from "react";

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturedCategories />
      <Suspense fallback={<PopularProductsSkele />}>
        <PopularProducts />
      </Suspense>
      <Suspense fallback={<LatestProductSkeleton />}>
        <LatestProductSection />
      </Suspense>
      <TrustBadges />
      <Testimonials />
      <NewsLetter />
    </>
  );
}
