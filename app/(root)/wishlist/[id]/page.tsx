import { getUserDetails } from "@/actions/user-action";
import WishlistItems from "@/components/WishlistItems";
import WishlistSearch from "@/components/WishlistSearch";

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

  if (!user) return;

  return (
    <section className="min-h-screen">
      <WishlistSearch userId={userId} user={user} />
      <WishlistItems userId={userId} search={search} />
    </section>
  );
}
