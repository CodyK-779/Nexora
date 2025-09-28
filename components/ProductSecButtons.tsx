"use client";

import { Loader2, ShoppingBag, ShoppingCart } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import Link from "next/link";
import { useSession } from "@/app/lib/auth-client";
import { addProductToCart } from "@/actions/cart-action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface Props {
  productId: string;
}

const ProductSecButtons = ({ productId }: Props) => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [adding, setAdding] = useState(false);
  const router = useRouter();

  const handleAddToCart = async () => {
    if (!session) {
      return toast.error("Please Sign In First");
    }

    setAdding(true);

    try {
      const result = await addProductToCart(productId, `/shop`);

      if (result.success) {
        toast.success("Item Added to Cart");
      } else {
        toast.error("Failed to add item to cart");
      }
    } catch (error) {
      console.error("Error adding an item to cart:", error);
    } finally {
      setAdding(false);
    }
  };

  const handleBuy = async () => {
    if (!session) {
      toast.error("Please Sign In Before Buying Anything");
      router.push("/login");
      return;
    }

    setLoading(true);

    try {
      const result = await addProductToCart(productId, `/product/${productId}`);

      if (result.success) {
        toast.success("Item Added to cart");
        router.push(`/cart/${session.user.id}`);
      } else {
        toast.error("Failed to add item to cart");
      }
    } catch (error) {
      console.error("Error adding an item to cart:", error);
    } finally {
      setLoading(false);
    }
  };

  const route = session ? `/cart/${session.user.id}` : "/login";

  return (
    <div className="flex items-center gap-1.5 mt-1.5 w-full">
      <Button
        size="sm"
        disabled={adding}
        onClick={handleAddToCart}
        className="flex items-center gap-1.5 font-medium w-full"
      >
        {adding ? (
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
        asChild
        disabled={loading}
        onClick={handleBuy}
        className="w-full border bg-white text-black dark:bg-black dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors"
      >
        <Link href={route} className="flex items-center gap-1.5 font-medium">
          <ShoppingBag />
          <p>Buy Now</p>
        </Link>
      </Button>
    </div>
  );
};

export default ProductSecButtons;
