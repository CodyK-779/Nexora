import { cache, Suspense } from "react";
import PopularProducts from "./PopularProducts";
import PopularProductsSkele from "@/components/skeletons/PopularProductsSkeleton";
import LatestProductSkeleton from "./skeletons/LatestProductSkeleton";
import LatestProductSection from "./LatestProductSection";
import { getCurrentUserWishlist } from "@/actions/wishlist-action";

export const getWishlistPromise = cache(() => getCurrentUserWishlist());

const PopularAndLatestWrapper = () => {
  const wishlistPromise = getWishlistPromise();

  return (
    <>
      <Suspense fallback={<PopularProductsSkele />}>
        <PopularProducts wishlistPromise={wishlistPromise} />
      </Suspense>
      <Suspense fallback={<LatestProductSkeleton />}>
        <LatestProductSection wishlistPromise={wishlistPromise} />
      </Suspense>
    </>
  );
};

export default PopularAndLatestWrapper;
