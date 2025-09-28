"use client";

import { Heart } from "lucide-react";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { WishListType } from "./InterfaceTypes";
import { useSession } from "@/app/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { toggleWishList } from "@/actions/wishlist-action";

interface Props {
  productId: string;
  wishlist: WishListType | undefined;
}

const ProductSecLike = ({ productId, wishlist }: Props) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [hasLiked, setHasLiked] = useState(
    wishlist?.items.some((item) => item.productId === productId) || false
  );

  const handleLike = async () => {
    if (!session) {
      toast.error(
        "You need an account in order to add this product to wishlist"
      );
      router.push("/login");
      return;
    }

    setLoading(true);

    try {
      const result = await toggleWishList(productId, "/");

      if (result.success) {
        setHasLiked(!hasLiked);
      } else {
        console.error("Failed to update wishlist:", result.error);
        toast.error("Failed to update wishlist");
      }
    } catch (error) {
      console.error("Error updating wishlist:", error);
      setHasLiked(
        wishlist?.items.some((item) => item.productId === productId) || false
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      className="absolute top-2 right-2.5 border rounded-full border-neutral-300 hover:bg-neutral-100 transition-colors ease-in"
      variant="ghost"
      size="icon"
      disabled={loading}
      onClick={handleLike}
    >
      <Heart
        className={`size-5 text-gray-500 transition-colors duration-150 ease-in ${
          hasLiked && "text-red-500 fill-red-500"
        }`}
      />
    </Button>
  );
};

export default ProductSecLike;
