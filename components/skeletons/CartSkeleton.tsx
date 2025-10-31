import CartPageHeader from "../CartPageHeader";
import { CartTableSkeleton } from "./CartTableSkeleton";
import OrderSummarySkeleton from "./OrderSummarySkeleton";

const CartSkeleton = () => {
  return (
    <>
      <CartPageHeader />
      <div className="max-container mt-10 w-full flex lg:flex-row items-start flex-col lg:gap-6 gap-10 pb-20">
        <CartTableSkeleton />
        <OrderSummarySkeleton />
      </div>
    </>
  );
};

export default CartSkeleton;
