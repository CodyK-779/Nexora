import { getUserDetails } from "@/actions/user-action";
import WishlistSkeleton from "@/components/skeletons/WishlistSkeleton";
import WishlistItems from "@/components/WishlistItems";
import WishlistSearch from "@/components/WishlistSearch";
import { Suspense } from "react";

export default async function WishListPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ search: string }>;
}) {
  const userId = (await params).id;
  const search = (await searchParams).search || "";
  const user = await getUserDetails(userId);
  const itemsCount = user?.wishList?.items.length;

  if (!user) return;

  return (
    <section className="min-h-screen">
      <WishlistSearch userId={userId} user={user} />
      <Suspense fallback={<WishlistSkeleton itemCount={itemsCount} />}>
        <WishlistItems userId={userId} search={search} />
      </Suspense>
    </section>
  );
}
