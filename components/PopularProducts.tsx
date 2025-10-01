import Image from "next/image";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Button } from "./ui/button";
import { ExternalLink } from "lucide-react";
import { getPopularProducts } from "@/actions/product-action";
import Link from "next/link";
import HeartIcon from "./HeartIcon";
import { getCurrentUserWishlist } from "@/actions/wishlist-action";
import PopularAddToCart from "./PopularAddToCart";
import { Badge } from "./ui/badge";

export const formattedPrice = (price: number) => {
  const formatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);

  return formatted;
};

const PopularProducts = async () => {
  const products = await getPopularProducts();
  const wishList = await getCurrentUserWishlist();

  return (
    <section className="px-4 py-12 sm:px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="md:text-4xl min-[400px]:text-3xl text-2xl font-semibold tracking-tight sm:text-4xl">
            Most{" "}
            <span className="text-blue-700 dark:text-blue-600">Popular</span>{" "}
            Items
          </h2>
          <p className="mt-2 min-[350px]:text-base text-sm text-gray-500 dark:text-gray-400">
            Discover the best-selling products loved by our customers
          </p>
        </div>

        {/* Product Grid */}
        {products.length > 0 ? (
          <div className="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 lg:gap-6 gap-4">
            {products.map((p) => (
              <Card
                key={p.id}
                className="group relative rounded-2xl shadow-sm hover:shadow-lg transition-shadow border-2"
              >
                {/* Product Image */}
                <div className="relative w-full size-48 overflow-hidden rounded-t-2xl border-b dark:bg-white">
                  <Image
                    src={p.images[0]}
                    alt="Product Image"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 768px, 1024px"
                    className="object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                  {/* {p.images.length > 1 && (
                    <div className="absolute top-2 right-2 flex items-center gap-1 bg-neutral-800 text-white px-2.5 rounded-full">
                      <i className="ri-multi-image-line"></i>
                      <p className="text-xs font-medium">{p.images.length}</p>
                    </div>
                  )} */}
                  <div className="absolute top-2 right-2.5">
                    <Badge className="rounded-full bg-black hover:bg-black text-white">
                      {p.category.name}
                    </Badge>
                  </div>
                </div>
                {/* Product Info */}
                <CardContent className="p-4">
                  <h3 className="font-semibold sm:text-lg text-base line-clamp-1">
                    {p.name}
                  </h3>
                  <p className="min-[350px]:text-sm text-xs text-neutral-500 dark:text-neutral-400 line-clamp-2">
                    {p.description}
                  </p>
                  <div className="flex items-center justify-between mt-1.5">
                    <p className="mt-2 font-bold min-[350px]:text-xl text-lg">
                      {formattedPrice(p.price)}
                    </p>
                    <HeartIcon productId={p.id} wishList={wishList} />
                  </div>
                </CardContent>
                {/* Actions */}
                <CardFooter className="flex min-[350px]:justify-between items-center p-4 max-[350px]:gap-2">
                  <PopularAddToCart productId={p.id} />
                  <Button
                    asChild
                    size="sm"
                    className="border max-[350px]:w-full bg-white text-black dark:bg-black dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors duration-100 ease-in"
                  >
                    <Link
                      href={`/product/${p.id}`}
                      className="flex items-center gap-2.5 font-medium"
                    >
                      <ExternalLink size={16} />
                      <p>View Details</p>
                    </Link>
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
