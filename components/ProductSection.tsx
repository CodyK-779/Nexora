"use client";

import { Search } from "lucide-react";
import { ProductsType, WishListType } from "./InterfaceTypes";
import Image from "next/image";
import Link from "next/link";
import { formattedPrice } from "./PopularProducts";
import ProductSecButtons from "./ProductSecButtons";
import ProductSecLike from "./ProductSecLike";

interface Props {
  filteredProducts: ProductsType[];
  wishlist: WishListType | undefined;
}

const ProductSection = ({ filteredProducts, wishlist }: Props) => {
  return (
    <section className="max-container grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 min-[500px]:grid-cols-2 grid-cols-1 lg:gap-6 min-[500px]:gap-4 gap-8">
      {filteredProducts.length > 0 ? (
        filteredProducts.map((product) => (
          <div key={product.id} className="flex flex-col">
            <div className="relative w-full aspect-square rounded-lg overflow-hidden border-2 group">
              <Link href={`/product/${product.id}`}>
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-300 ease-in"
                />
              </Link>
              <ProductSecLike productId={product.id} wishlist={wishlist} />
            </div>
            <div className="flex flex-col mx-1 mt-2">
              <p className="text-sm font-semibold line-clamp-1">
                {product.name}
              </p>
              <p className="mt-1 text-xs font-medium text-neutral-500 dark:text-neutral-400 line-clamp-1">
                {product.description}
              </p>
              <div className="flex items-center justify-between mt-1">
                <p className="text-xs font-medium text-neutral-500 dark:text-neutral-300">
                  <span className="text-yellow-400">★</span> 4.5 reviews
                </p>
                <p className="text-sm font-semibold">
                  {formattedPrice(product.price)}
                </p>
              </div>
              <ProductSecButtons productId={product.id} />
            </div>
          </div>
        ))
      ) : (
        <div className="col-span-full text-center py-12">
          <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            No products found
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Try adjusting your search or filters
          </p>
        </div>
      )}
    </section>
  );
};

export default ProductSection;
