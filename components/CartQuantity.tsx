"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { decreaseQuantity, increaseQuantity } from "@/actions/cart-action";
import { toast } from "sonner";

interface Props {
  cartItemId: string;
  quantity: number;
  inventory: number;
}

const CartQuantity = ({ cartItemId, quantity, inventory }: Props) => {
  const [loading, setLoading] = useState(false);

  const handleIncrement = async () => {
    setLoading(true);

    try {
      const result = await increaseQuantity(
        cartItemId,
        `/cart/89nUHGBsm0qVXKXSL0KpJpmvJ2J3BPPJ`
      );

      if (result.error) {
        console.error("Failed to increment quantity:", result.error);
        toast.error("Failed to increment quantity");
      }
    } catch (error) {
      console.error("Error incrementing quantity:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDecrement = async () => {
    setLoading(true);

    try {
      const result = await decreaseQuantity(
        cartItemId,
        `/cart/89nUHGBsm0qVXKXSL0KpJpmvJ2J3BPPJ`
      );

      if (result.error) {
        console.error("Failed to decrement quantity:", result.error);
        toast.error("Failed to decrement quantity");
      }
    } catch (error) {
      console.error("Error decrementing quantity:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-3">
      <Button
        size="sm"
        variant="outline"
        className="rounded-full font-medium"
        disabled={quantity === 1 || loading}
        onClick={handleDecrement}
      >
        -
      </Button>
      <p className="font-medium text-sm">{quantity}</p>
      <Button
        size="sm"
        variant="outline"
        className="rounded-full font-medium"
        disabled={quantity >= inventory || loading}
        onClick={handleIncrement}
      >
        +
      </Button>
    </div>
  );
};

export default CartQuantity;
