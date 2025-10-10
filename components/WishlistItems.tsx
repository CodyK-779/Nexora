import { getFilteredWishlistItems } from "@/actions/wishlist-action";
import Image from "next/image";
import { formattedPrice } from "./PopularProducts";
import WishAdd2cartOrRemove from "./WishAdd2cartOrRemove";
import Link from "next/link";

interface Props {
  userId: string;
  search: string;
}

const WishlistItems = async ({ userId, search }: Props) => {
  const wishListItems = await getFilteredWishlistItems(userId, search);

  const categoryColors = (category: string) => {
    switch (category) {
      case "Electronics":
        return "bg-gradient-to-r from-gray-900 via-purple-900 to-violet-900";

      case "Clothings":
        return "bg-gradient-to-r from-purple-500 via-pink-500 to-red-500";
      case "Household":
        return "bg-gradient-to-bl from-emerald-400 via-teal-500 to-green-700";
      case "Furniture":
        return "bg-gradient-to-t from-[#10a19d] via-[#540375] to-[#ff7000]";
      case "Sports":
        return "bg-gradient-to-br from-sky-900 via-blue-800 to-indigo-900";
      case "Collectables":
        return "bg-gradient-to-br from-indigo-900 via-purple-800 via-fuchsia-700 to-cyan-500";
    }
  };

  return (
    <section className="max-container sm:py-20 py-16">
      {wishListItems.length > 0 ? (
        <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 lg:gap-6 min-[500px]:gap-4 min-[400px]:gap-3 gap-2">
          {wishListItems.map((item) => (
            <div key={item.id} className="flex flex-col min-[500px]:mb-0 mb-4">
              <Link href={`/product/${item.product.id}`}>
                <div className="relative w-full aspect-square rounded-xl overflow-hidden border-2 group">
                  <Image
                    src={item.product.images[0]}
                    alt={item.product.name}
                    fill
                    className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-300 ease-in"
                  />
                  <div
                    className={`absolute top-2 right-2 min-[400px]:text-[10px] min-[360px]:text-[8px] text-[7px] text-white font-medium min-[360px]:px-2.5 px-2 py-0.5 rounded-full ${categoryColors(
                      item.product.category.name
                    )}`}
                  >
                    {item.product.category.name}
                  </div>
                </div>
              </Link>

              <p className="mt-2 mx-1 min-[400px]:text-sm text-xs font-semibold line-clamp-1">
                {item.product.name}
              </p>
              <p className="mt-1 mx-1 min-[400px]:text-xs text-[10px] font-medium text-neutral-500 dark:text-neutral-400 line-clamp-1">
                {item.product.description}
              </p>
              <div className="flex items-center justify-between mt-1 mx-1">
                <p className="min-[400px]:text-xs text-[10px] font-medium text-neutral-500 dark:text-neutral-300">
                  <span className="text-yellow-400">★</span> 4.5 reviews
                </p>
                <p className="min-[400px]:text-sm text-xs font-semibold">
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
        <h1 className="sm:text-3xl min-[400px]:text-2xl min-[350px]:text-xl text-lg font-medium text-center pt-[140px]">
          No wishlist items found
        </h1>
      )}
    </section>
  );
};

export default WishlistItems;
