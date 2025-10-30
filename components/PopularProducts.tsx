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
import { BoxReveal } from "./ui/box-reveal";

export const formattedPrice = (price: number) => {
  const formatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);

  return formatted;
};

export const categoryColors = (category: string) => {
  switch (category) {
    case "Electronics":
      return "bg-gradient-to-r from-gray-900 via-purple-900 to-violet-900 text-white rounded-full";
    case "Clothings":
      return "bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white rounded-full";
    case "Household":
      return "bg-gradient-to-bl from-emerald-400 via-teal-500 to-green-700 text-white rounded-full";
    case "Furniture":
      return "bg-gradient-to-t from-[#10a19d] via-[#540375] to-[#ff7000] text-white rounded-full";
    case "Sports":
      return "bg-gradient-to-l from-[#e966a0] via-[#2b2730] to-[#6554af] text-white rounded-full";
    case "Collectables":
      return "bg-gradient-to-br from-indigo-900 via-purple-800 via-fuchsia-700 to-cyan-500 text-white rounded-full";
  }
};

const PopularProducts = async () => {
  const [products, wishList] = await Promise.all([
    getPopularProducts(),
    getCurrentUserWishlist(),
  ]);

  return (
    <section className="py-12">
      <div className="max-container">
        {/* Section Header */}
        <div className="flex flex-col items-center justify-center text-center mb-10">
          <BoxReveal boxColor={"#5046e6"} duration={1}>
            <h2 className="md:text-4xl min-[400px]:text-3xl text-2xl font-semibold tracking-tight sm:text-4xl">
              Most{" "}
              <span className="text-blue-700 dark:text-blue-600">Popular</span>{" "}
              Items
            </h2>
          </BoxReveal>
          <BoxReveal boxColor={"#5046e6"} duration={1}>
            <p className="mt-2 min-[350px]:text-base text-sm text-gray-500 dark:text-gray-400">
              Discover the best-selling products loved by our customers
            </p>
          </BoxReveal>
        </div>
        {/* Product Grid */}
        {products.length > 0 ? (
          <div className="flex sm:grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 sm:gap-5 gap-4 overflow-x-auto sm:overflow-visible no-scrollbar pb-2">
            {products.map((p) => (
              <Card
                key={p.id}
                className="group max-[640px]:max-w-[300px] max-[350px]:max-w-[285px] relative rounded-2xl shadow-sm hover:shadow-lg transition-shadow border-2 flex-shrink-0"
              >
                {/* Product Image */}
                <Link href={`/product/${p.id}`}>
                  <div className="relative w-full size-48 overflow-hidden rounded-t-2xl border-b dark:bg-white">
                    <Image
                      src={p.images[0]}
                      alt="Product Image"
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 768px, 1024px"
                      className="object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 right-2.5">
                      <Badge
                        textSize="text-[10px]"
                        className={categoryColors(p.category.name)}
                      >
                        {p.category.name}
                      </Badge>
                    </div>
                  </div>
                </Link>

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
                <CardFooter className="flex min-[350px]:justify-between items-center p-4 gap-2">
                  <PopularAddToCart productId={p.id} />
                  <Button
                    asChild
                    size="sm"
                    className="border w-full bg-white text-black dark:bg-black dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors duration-100 ease-in"
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
