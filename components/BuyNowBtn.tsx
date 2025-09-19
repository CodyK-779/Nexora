"use client";

import { Loader2, ShoppingBag } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/app/lib/auth-client";
import { toast } from "sonner";
import { addProductToCart } from "@/actions/cart-action";

interface Props {
  productId: string;
}

const BuyNowBtn = ({ productId }: Props) => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleClick = async () => {
    if (!session) {
      toast.error("Please Sign In Before Adding An Item To Cart");
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

  return (
    <Button
      className="w-full flex items-center justify-center font-medium gap-2 min-[420px]:large-btn max-[350px]:small-btn"
      disabled={loading}
      onClick={handleClick}
    >
      {loading ? (
        <>
          <Loader2 className="animate-spin" />
          Loading...
        </>
      ) : (
        <>
          <ShoppingBag className="size-6" />
          <p className="font-semibold">Buy Now</p>
        </>
      )}
    </Button>
  );
};

export default BuyNowBtn;
