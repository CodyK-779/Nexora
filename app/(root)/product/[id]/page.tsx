import { getProductDetails } from "@/actions/product-action";
import { getCurrentUserWishlist } from "@/actions/user-action";
import BackButton from "@/components/BackButton";
import ImageDetailSection from "@/components/ImageDetailSection";
import ProductDetails from "@/components/ProductDetails";

export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const productId = (await params).id;
  const product = await getProductDetails(productId);
  const wishList = await getCurrentUserWishlist();

  if (!product) return null;

  return (
    <section className="max-w-6xl mx-auto px-4 pt-28">
      <BackButton />
      <div className="grid min-[864px]:grid-cols-2 w-full gap-12 mt-6">
        <ImageDetailSection images={product.images} />
        <ProductDetails product={product} wishList={wishList} />
      </div>
    </section>
  );
}
