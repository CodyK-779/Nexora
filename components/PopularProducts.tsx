import Image from "next/image";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Button } from "./ui/button";
import { Heart, ShoppingCart } from "lucide-react";
import { getPopularProducts } from "@/actions/product-action";
import { Badge } from "./ui/badge";

const PopularProducts = async () => {
  const products = await getPopularProducts();

  return (
    <section className="px-4 py-12 sm:px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Most{" "}
            <span className="text-blue-700 dark:text-blue-600">Popular</span>{" "}
            Items
          </h2>
          <p className="mt-2 text-gray-500 dark:text-gray-400">
            Discover the best-selling products loved by our customers
          </p>
        </div>

        {/* Product Grid */}
        {products.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((p) => (
              <Card
                key={p.id}
                className="group relative rounded-2xl shadow-sm hover:shadow-lg transition-shadow border-2"
              >
                {/* Product Image */}
                <div className="relative w-full aspect-video overflow-hidden rounded-t-2xl border-b">
                  <Image
                    src={p.images[0]}
                    alt="Product Image"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 768px, 1024px"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {p.images.length > 1 && (
                    <div className="absolute top-2 right-2 flex items-center gap-1 bg-neutral-800 text-white px-2.5 rounded-full">
                      <i className="ri-multi-image-line"></i>
                      <p className="text-xs font-medium">{p.images.length}</p>
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg truncate">{p.name}</h3>
                  <p className="text-sm text-gray-500 line-clamp-2">
                    {p.description}
                  </p>
                  <p className="mt-2 font-bold text-xl">${p.price}</p>
                </CardContent>

                {/* Actions */}
                <CardFooter className="flex justify-between items-center p-4">
                  <Button size="sm" className="gap-2">
                    <ShoppingCart size={16} /> Add to Cart
                  </Button>
                  <Button size="icon" variant="ghost">
                    <Heart className="w-5 h-5 text-gray-500 hover:text-red-500 transition-colors" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-lg font-semibold pt-10 text-center">
            No Popular Products Available
          </p>
        )}
      </div>
    </section>
  );
};

export default PopularProducts;
