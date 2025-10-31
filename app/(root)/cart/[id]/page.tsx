import { Suspense } from "react";
import CartContent from "@/components/CartContent";
import CartSkeleton from "@/components/skeletons/CartSkeleton";

export default async function CartPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <Suspense fallback={<CartSkeleton />}>
      <CartContent params={params} />
    </Suspense>
  );
}
