import { getAllCategories } from "@/actions/category-action";
import { getAllProducts } from "@/actions/product-action";
import { getCurrentUserWishlist } from "@/actions/wishlist-action";
import ShopSection from "@/components/ShopSection";

export const dynamic = "force-dynamic";

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ product: string }>;
}) {
  const productSearch = (await searchParams).product;
  const products = await getAllProducts(productSearch);
  const categories = await getAllCategories();
  const wishlist = await getCurrentUserWishlist();

  return (
    <section className="min-h-screen">
      <ShopSection
        products={products}
        categories={categories}
        wishlist={wishlist}
      />
    </section>
  );
}
