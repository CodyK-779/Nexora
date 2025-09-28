import { getAllCategories } from "@/actions/category-action";
import { getAllProducts } from "@/actions/product-action";
import { getCurrentUserWishlist } from "@/actions/wishlist-action";
import ShopSection from "@/components/ShopSection";

export default async function ShopPage() {
  const products = await getAllProducts();
  const categories = await getAllCategories();
  const wishlist = await getCurrentUserWishlist();

  return (
    <section>
      <ShopSection
        products={products}
        categories={categories}
        wishlist={wishlist}
      />
    </section>
  );
}
