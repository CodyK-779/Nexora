"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Loader2, ShoppingCart, Trash2 } from "lucide-react";
import { addProductToCart } from "@/actions/cart-action";
import { toast } from "sonner";
import { removeWishlistItem } from "@/actions/wishlist-action";
import { useSession } from "@/app/lib/auth-client";

interface Props {
  userId: string;
  productId: string;
  wishlistItemId: string;
}

const WishAdd2cartOrRemove = ({ userId, productId, wishlistItemId }: Props) => {
  const { data: session } = useSession();
  const [isAdding, setIsAdding] = useState(false);
  const [removing, setRemoving] = useState(false);

  const handleAddToCart = async () => {
    if (userId !== session?.user.id) {
      toast.error("This action is restricted to account owners only.");
      return;
    }

    setIsAdding(true);

    try {
      const result = await addProductToCart(productId, `/wishlist/${userId}`);

      if (result.success) {
        toast.success("Item Added to cart");
      } else {
        toast.error("Failed to add item to cart");
      }
    } catch (error) {
      console.error("Error adding an item to cart:", error);
    } finally {
      setIsAdding(false);
    }
  };

  const removeWishlist = async () => {
    if (userId !== session?.user.id) {
      toast.error("This action is restricted to account owners only.");
      return;
    }

    setRemoving(true);

    try {
      const result = await removeWishlistItem(
        wishlistItemId,
        `/wishlist/${userId}`
      );

      if (result.success) {
        toast.success("Item Removed From Wishlist");
      } else {
        toast.error("Failed to remove item from wishlist");
      }
    } catch (error) {
      console.error("Error removing item from wishlist:", error);
    } finally {
      setRemoving(false);
    }
  };

  return (
    <div className="flex flex-col min-[500px]:flex-row items-center min-[500px]:gap-1.5 gap-2 mt-1.5 w-full">
      <Button
        size="sm"
        className="flex items-center min-[400px]:small-btn extra-small-btn gap-1.5 font-medium w-full"
        disabled={isAdding}
        onClick={handleAddToCart}
      >
        {isAdding ? (
          <>
            <Loader2 className="animate-spin" />
            Adding...
          </>
        ) : (
          <>
            <ShoppingCart size={16} />
            <p>Add to Cart</p>
          </>
        )}
      </Button>

      <Button
        size="sm"
        className="flex items-center min-[400px]:small-btn extra-small-btn gap-1.5 font-medium w-full border bg-white text-black dark:bg-black dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors"
        onClick={removeWishlist}
        disabled={removing}
      >
        {removing ? (
          <>
            <Loader2 className="animate-spin" />
            Removing...
          </>
        ) : (
          <>
            <Trash2 size={16} />
            <p>Remove</p>
          </>
        )}
      </Button>
    </div>
  );
};

export default WishAdd2cartOrRemove;
