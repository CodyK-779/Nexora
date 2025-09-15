import { getFilteredWishlistItems } from "@/actions/wishlist-action";
import Image from "next/image";
import { Badge } from "./ui/badge";
import { formattedPrice } from "./PopularProducts";
import WishAdd2cartOrRemove from "./WishAdd2cartOrRemove";
import Link from "next/link";

interface Props {
  userId: string;
  search: string;
  wishlistId: string | undefined;
}

const WishlistItems = async ({ userId, search, wishlistId }: Props) => {
  const wishListItems = await getFilteredWishlistItems(wishlistId!, search);

  return (
    <section className="max-container pt-20 pb-60">
      <div className="grid grid-cols-5 gap-6">
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
                <Badge className="absolute top-2 right-2 text-[10px] bg-black text-white rounded-full">
                  {item.product.category.name}
                </Badge>
              </div>
            </Link>

            <p className="mt-2 ml-1 text-sm font-semibold line-clamp-1">
              {item.product.name}
            </p>
            <p className="mt-1 ml-1 text-xs font-medium text-neutral-500 dark:text-neutral-400 line-clamp-1">
              {item.product.description}
            </p>
            <div className="flex items-center justify-between mt-1 ml-1">
              <p className="text-xs">
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
    </section>
  );
};

export default WishlistItems;
