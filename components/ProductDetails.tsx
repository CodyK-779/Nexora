import { Star } from "lucide-react";
import { Badge } from "./ui/badge";
import DescTextExtend from "./DescTextExtend";
import { formattedPrice } from "./PopularProducts";
import ProductDetailsHeart from "./ProductDetailsHeart";
import { ProductDetailsType, WishListType } from "./InterfaceTypes";
import ProductDetailsCart from "./ProductDetailsCart";
import BuyNowBtn from "./BuyNowBtn";

interface Props {
  product: ProductDetailsType;
  wishList: WishListType | undefined;
}

const nikeId = "73520229-db86-41aa-9a0c-b7fe11cf2c3e";
const macId = "90bea6ab-a640-414e-86f9-ca349ec6646e";
const hoodieId = "cfa7be9d-7657-4298-9a4c-828df9a094eb";
const ps5Id = "a74b3fb2-b43d-4fb6-9f89-f1dd42c11cf0";

const ProductDetails = ({ product, wishList }: Props) => {
  const discountedIds = [nikeId, macId, hoodieId, ps5Id];
  const existingIds = discountedIds.find((dis) => dis === product.id);

  const displayDiscount = (id: string) => {
    if (!existingIds) return;

    if (id === nikeId) return "$15,000,00";
    if (id === macId) return "$1.199.99";
    if (id === hoodieId) return "$35.99";
    if (id === ps5Id) return "$749.99";
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Title + Category */}
      <div>
        <div className="flex items-center gap-3">
          <Badge
            textSize="text-[11px]"
            className="bg-purple-600 text-white hover:bg-purple-600"
          >
            {product.category.name}
          </Badge>
          {product.status === "Popular" && (
            <Badge
              textSize="text-[11px]"
              className="bg-yellow-400 text-white hover:bg-yellow-400"
            >
              {product.status}
            </Badge>
          )}
        </div>
        <h1 className="min-[420px]:text-3xl text-2xl font-bold mt-3">
          {product.name}
        </h1>
        <div className="flex items-center gap-1 mt-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`size-4 ${
                i < 4
                  ? "fill-yellow-400 text-yellow-400"
                  : i === 4
                  ? "fill-yellow-400/50 text-yellow-400"
                  : "text-gray-400"
              }`}
            />
          ))}
          <span className="text-sm text-gray-400 ml-2">(4.5) Reviews</span>
        </div>
      </div>

      {/* Price + Stock */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <p className="min-[420px]:text-2xl text-xl font-semibold text-blue-600 dark:text-blue-500">
            {formattedPrice(product.price)}
          </p>
          <p className="min-[420px]:text-base text-xs font-medium line-through text-gray-400">
            {displayDiscount(product.id)}
          </p>
        </div>
        <span
          className={`min-[420px]:text-sm text-xs font-semibold px-3 py-1 rounded-full ${
            product.inventory > 0
              ? "text-green-600 bg-green-500/30 dark:bg-green-500/20 dark:text-green-500"
              : "bg-red-500/20 text-red-400"
          }`}
        >
          {product.inventory > 0
            ? `${product.inventory} in stock`
            : "Out of stock"}
        </span>
      </div>

      {/* Description */}
      <div>
        <h2 className="text-lg font-semibold mb-2">Product Description</h2>
        <DescTextExtend description={product.description} />
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-3 w-full mt-4">
        <ProductDetailsCart productId={product.id} />
        <BuyNowBtn productId={product.id} />
        <ProductDetailsHeart productId={product.id} wishList={wishList} />
      </div>
    </div>
  );
};

export default ProductDetails;
