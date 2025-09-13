"use client";

import { Heart } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { WishListType } from "./InterfaceTypes";
import { toggleWishList } from "@/actions/product-action";
import { toast } from "sonner";
import { useSession } from "@/app/lib/auth-client";
import { useRouter } from "next/navigation";

interface Props {
  productId: string;
  wishList: WishListType | undefined;
}

const ProductDetailsHeart = ({ productId, wishList }: Props) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [isLiking, setIsLiking] = useState(false);
  const [hasLiked, setHasLiked] = useState(
    wishList?.items.some((item) => item.productId === productId) || false
  );

  const handleWishList = async () => {
    if (!session) {
      toast.error(
        "You need an account in order to add this product to wishlist"
      );
      router.push("/login");
      return;
    }

    setIsLiking(true);

    try {
      const result = await toggleWishList(productId, `/product/${productId}`);

      if (result.success) {
        setHasLiked(!hasLiked);
      } else {
        console.error("Failed to update wishlist:", result.error);
        toast.error("Failed to update wishlist");
      }
    } catch (error) {
      console.error("Error updating wishlist:", error);
      setHasLiked(
        wishList?.items.some((item) => item.productId === productId) || false
      );
    } finally {
      setIsLiking(false);
    }
  };

  return (
    <Button className="heart-icon" onClick={handleWishList} disabled={isLiking}>
      <Heart
        className={`min-[400px]:size-5 size-4 text-pink-500 transition-colors duration-150 ease-in ${
          hasLiked && "text-red-500 fill-red-500"
        }`}
      />
    </Button>
  );
};

export default ProductDetailsHeart;
