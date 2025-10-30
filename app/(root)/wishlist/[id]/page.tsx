import WishlistContent from "@/components/skeletons/WishlistContent";
import WishlistPageSkeleton from "@/components/skeletons/WishlistPageSkeleton";
import { Suspense } from "react";

export default async function WishListPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ search: string }>;
}) {
  return (
    <Suspense fallback={<WishlistPageSkeleton />}>
      <WishlistContent params={params} searchParams={searchParams} />
    </Suspense>
  );
}
