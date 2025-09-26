import { getFilteredWishlistItems } from "@/actions/wishlist-action";
import Image from "next/image";
import { Badge } from "./ui/badge";
import { formattedPrice } from "./PopularProducts";
import WishAdd2cartOrRemove from "./WishAdd2cartOrRemove";
import Link from "next/link";

interface Props {
  userId: string;
  search: string;
}

const WishlistItems = async ({ userId, search }: Props) => {
  const wishListItems = await getFilteredWishlistItems(userId, search);

  return (
    <section className="max-container sm:pt-20 pt-16 ">
      {wishListItems.length > 0 ? (
        <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 min-[500px]:grid-cols-2 grid-cols-1 lg:gap-6 min-[500px]:gap-4 gap-8">
          {wishListItems.map((item) => (
            <div key={item.id} className="flex flex-col">
              <Link href={`/product/${item.product.id}`}>
                <div className="relative w-full aspect-square rounded-xl overflow-hidden border-2 group">
                  <Image
                    src={item.product.images[0]}
                    alt={item.product.name}
                    fill
                    className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-300 ease-in"
                  />
                  <Badge className="absolute top-2 right-2 text-[10px] bg-black text-white hover:bg-black rounded-full">
                    {item.product.category.name}
                  </Badge>
                </div>
              </Link>

              <p className="mt-2 mx-1 text-sm font-semibold line-clamp-1">
                {item.product.name}
              </p>
              <p className="mt-1 mx-1 text-xs font-medium text-neutral-500 dark:text-neutral-400 line-clamp-1">
                {item.product.description}
              </p>
              <div className="flex items-center justify-between mt-1 mx-1">
                <p className="text-xs font-medium text-neutral-500 dark:text-neutral-300">
                  <span className="text-yellow-400">★</span> 4.5 reviews
                </p>
                <p className="text-sm font-semibold">
                  {formattedPrice(item.product.price)}
                </p>
              </div>
              <WishAdd2cartOrRemove
                userId={userId}
                productId={item.product.id}
                wishlistItemId={item.id}
              />
            </div>
          ))}
        </div>
      ) : (
        <h1 className="sm:text-3xl min-[400px]:text-2xl min-[350px]:text-xl text-lg font-medium text-center">
          No wishlist items found
        </h1>
      )}
    </section>
  );
};

export default WishlistItems;
