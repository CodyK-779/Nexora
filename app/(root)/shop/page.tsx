import ShopContent from "@/components/skeletons/ShopContent";
import ShopSkeleton from "@/components/skeletons/ShopSkeleton";
import { Suspense } from "react";

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ product: string }>;
}) {
  return (
    <Suspense fallback={<ShopSkeleton />}>
      <ShopContent searchParams={searchParams} />
    </Suspense>
  );
}
