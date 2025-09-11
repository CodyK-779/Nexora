import { $Enums } from "@/app/generated/prisma";
import { Heart, ShoppingBag, ShoppingCart, Star } from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import DescTextExtend from "./DescTextExtend";
import { formattedPrice } from "./PopularProducts";

interface Props {
  product: {
    name: string;
    id: string;
    description: string;
    price: number;
    images: string[];
    categoryId: string;
    status: $Enums.Status;
    inventory: number;
    createdAt: Date;
    updatedAt: Date;
    category: {
      name: string;
    };
  };
}

const ProductDetails = ({ product }: Props) => {
  return (
    <div className="flex flex-col gap-6">
      {/* Title + Category */}
      <div>
        <div className="flex items-center gap-3">
          <Badge className="bg-purple-600 text-white hover:bg-purple-600">
            {product.category.name}
          </Badge>
          {product.status === "Popular" && (
            <Badge className="bg-yellow-400 text-white hover:bg-yellow-400">
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
          <span className="text-sm text-gray-400 ml-2">(4.5)</span>
        </div>
      </div>

      {/* Price + Stock */}
      <div className="flex items-center justify-between">
        <p className="min-[420px]:text-2xl text-xl font-semibold text-blue-600 dark:text-blue-500">
          {formattedPrice(product.price)}
        </p>
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
        <Button className="add-to-cart-btn">
          <ShoppingCart className="size-6" />
          <p className="font-medium">Add to Cart</p>
        </Button>
        <Button className="w-full flex items-center justify-center font-medium gap-2 min-[420px]:large-btn max-[350px]:small-btn">
          <ShoppingBag className="size-6" />
          <p className="font-medium">Buy now</p>
        </Button>
        <Button className="heart-icon">
          <Heart className="size-5 text-pink-500" />
        </Button>
      </div>
    </div>
  );
};

export default ProductDetails;
