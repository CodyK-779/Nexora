import { getUserDetails } from "@/actions/user-action";
import WishlistSearch from "../WishlistSearch";
import WishlistItems from "../WishlistItems";

interface Props {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ search: string }>;
}

const WishlistContent = async ({ params, searchParams }: Props) => {
  const [resolvedParams, resolvedSearch] = await Promise.all([
    params,
    searchParams,
  ]);
  const userId = resolvedParams.id;
  const search = resolvedSearch.search || "";
  const user = await getUserDetails(userId);

  if (!user) return null;

  return (
    <section className="min-h-screen">
      <WishlistSearch userId={userId} user={user} />
      <WishlistItems userId={userId} search={search} />
    </section>
  );
};

export default WishlistContent;
