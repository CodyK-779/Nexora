"use client";

import { addProductToCart } from "@/actions/cart-action";
import { removeWishlistItem } from "@/actions/wishlist-action";
import { useSession } from "@/app/lib/auth-client";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Loader2, ShoppingCart, Heart } from "lucide-react";

interface Props {
  userId: string;
  productId: string;
  itemId: string;
  inventory: number;
}

const WishlistTabBtns = ({ userId, productId, itemId, inventory }: Props) => {
  const { data: session } = useSession();
  const [adding, setAdding] = useState(false);
  const [removing, setRemoving] = useState(false);

  const handleAddtoCart = async () => {
    if (session?.user.id !== userId) {
      toast.error("You are not the current user");
      return;
    }

    if (inventory < 1) {
      return toast.error("This product is currently out of stock");
    }

    setAdding(true);

    try {
      const result = await addProductToCart(
        productId,
        `/profile/${session?.user.id}`
      );

      if (result.success) {
        toast.success("Item Added to Cart");
      } else {
        toast.error("Failed to add item to card");
      }
    } catch (error) {
      console.error("Error adding an item to cart:", error);
    } finally {
      setAdding(false);
    }
  };

  const handleRemove = async () => {
    if (session?.user.id !== userId) {
      toast.error("You are not the current user");
      return;
    }

    setRemoving(true);

    try {
      const result = await removeWishlistItem(
        itemId,
        `/profile/${session?.user.id}`
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
    <div className="flex justify-between items-center gap-2 mt-1">
      <Button
        className="small-btn flex items-center gap-2 w-full"
        disabled={adding}
        onClick={handleAddtoCart}
      >
        {adding ? (
          <>
            <Loader2 className="animate-spin" />
            Adding...
          </>
        ) : (
          <>
            <ShoppingCart className="size-4" />
            Add to Cart
          </>
        )}
      </Button>
      <Button
        className="small-btn flex items-center gap-2 w-full border bg-white text-black dark:bg-black dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors"
        disabled={removing}
        onClick={handleRemove}
      >
        {removing ? (
          <>
            <Loader2 className="animate-spin" />
            Removing
          </>
        ) : (
          <>
            <Heart />
            Remove
          </>
        )}
      </Button>
    </div>
  );
};

export default WishlistTabBtns;
