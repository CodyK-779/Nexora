"use client";

import { Heart } from "lucide-react";
import { Button } from "./ui/button";
import { useSession } from "@/app/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { toggleWishList } from "@/actions/wishlist-action";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { WishListItem } from "@/app/generated/prisma";

interface Props {
  productId: string;
  wishList:
    | {
        id: string;
        userId: string;
        createdAt: Date;
        updatedAt: Date;
        items: WishListItem[];
      }
    | undefined;
}

const HeartIcon = ({ productId, wishList }: Props) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [isLiking, setIsLiking] = useState(false);
  const [hasLiked, setHasLiked] = useState(
    wishList?.items.some((item) => item.productId === productId) || false
  );

  const handleLike = async () => {
    if (!session) {
      toast.error(
        "You need an account in order to add this product to wishlist"
      );
      router.push("/login");
      return;
    }

    setIsLiking(true);

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
        wishList?.items.some((item) => item.productId === productId) || false
      );
    } finally {
      setIsLiking(false);
    }
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          size="icon"
          variant="outline"
          className="border-2 dark:border"
          disabled={isLiking}
          onClick={handleLike}
        >
          <Heart
            className={`size-5 text-gray-500 transition-colors duration-150 ease-in ${
              hasLiked && "text-red-500 fill-red-500"
            }`}
          />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p className="font-medium">
          {hasLiked ? "Remove from Wishlist" : "Add to Wishlist"}
        </p>
      </TooltipContent>
    </Tooltip>
  );
};

export default HeartIcon;
