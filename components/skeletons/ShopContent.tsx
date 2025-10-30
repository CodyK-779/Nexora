import { getAllCategories } from "@/actions/category-action";
import { getAllProducts } from "@/actions/product-action";
import { getCurrentUserWishlist } from "@/actions/wishlist-action";
import ShopSection from "../ShopSection";

interface Props {
  searchParams: Promise<{ product: string }>;
}

const ShopContent = async ({ searchParams }: Props) => {
  const productSearch = (await searchParams).product;

  const [products, categories, wishlist] = await Promise.all([
    getAllProducts(productSearch),
    getAllCategories(),
    getCurrentUserWishlist(),
  ]);

  return (
    <section className="min-h-screen">
      <ShopSection
        products={products}
        categories={categories}
        wishlist={wishlist}
      />
    </section>
  );
};

export default ShopContent;
