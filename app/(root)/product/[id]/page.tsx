import { getProductDetails } from "@/actions/product-action";

export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const productId = (await params).id;
  const product = await getProductDetails(productId);

  if (!product) return null;

  return <div className="pt-20">{product.description}</div>;
}
