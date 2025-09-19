"use client";

import { deleteCartItem } from "@/actions/cart-action";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface Props {
  cartItemId: string;
}

const DeleteCartItem = ({ cartItemId }: Props) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);

    try {
      const result = await deleteCartItem(
        cartItemId,
        `/cart/89nUHGBsm0qVXKXSL0KpJpmvJ2J3BPPJ`
      );

      if (result.error) {
        console.error("Failed to delete cart item:", result.error);
        toast.error("Failed to delete cart item");
      }
    } catch (error) {
      console.error("Error deleting cart item:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button disabled={loading} onClick={handleDelete}>
      <Trash2 className="size-4" />
    </button>
  );
};

export default DeleteCartItem;
