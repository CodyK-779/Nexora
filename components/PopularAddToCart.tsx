"use client";

import { Loader2, ShoppingCart } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { useSession } from "@/app/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { addProductToCart } from "@/actions/cart-action";

interface Props {
  productId: string;
}

const PopularAddToCart = ({ productId }: Props) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async () => {
    if (!session) {
      toast.error("Please Sign In Before Adding An Item To Cart");
      router.push("/login");
      return;
    }

    setIsAdding(true);

    try {
      const result = await addProductToCart(productId, "/");

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

  return (
    <Button
      size="sm"
      className="flex items-center gap-2 font-medium max-[350px]:w-full"
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
  );
};

export default PopularAddToCart;
