import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Skeleton } from "../ui/skeleton";

const OrderSummarySkeleton = () => {
  return (
    <section className="min-[1100px]:min-w-[400px] min-[500px]:min-w-[350px] max-[500px]:w-full border p-4 rounded-md bg-neutral-50 dark:bg-neutral-950">
      <h3 className="font-semibold pb-3.5">Order Summary</h3>
      <hr className="border" />
      <div className="flex flex-col gap-2.5 pt-4">
        <Label className="font-medium">ADDRESS</Label>
        <div className="relative inline-block w-full text-sm border">
          <button className="peer w-full text-left px-4 pr-2 py-2 bg-white dark:bg-neutral-950 focus:outline-none">
            <span className="font-medium">Select Address</span>
            <svg
              className="w-5 h-5 inline float-right rotate-0"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="#6B7280"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-2.5 pt-7 pb-6">
        <div className="flex justify-between">
          <Label className="font-medium">PROMO CODE</Label>
          <p className="text-[10px] text-neutral-500 dark:text-neutral-400 font-medium">
            codes (442005, 246810, 321541)
          </p>
        </div>
        <div className="flex items-center rounded-full border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 p-0.5 pr-1">
          <Input
            type="text"
            placeholder="Type here..."
            className="flex-1 border-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 rounded-l-full text-sm"
          />
          <Button type="button" size="sm" className="rounded-full px-5">
            Apply
          </Button>
        </div>
      </div>

      <hr className="border" />

      <div className="flex flex-col gap-3.5 pt-5 text-sm font-medium pb-4">
        {/* Item count */}
        <div className="flex items-center justify-between">
          <p>Items</p>
          <Skeleton className="w-6 h-4" />
        </div>
        {/* Sub total */}
        <div className="flex items-center justify-between">
          <p>Sub Total</p>
          <Skeleton className="w-32 h-4" />
        </div>
        {/* Shipping */}
        <div className="flex items-center justify-between">
          <p>Shipping</p>
          <Skeleton className="w-20 h-4" />
        </div>
        {/* Taxes */}
        <div className="flex items-center justify-between">
          <p>Taxes</p>
          <Skeleton className="w-20 h-4" />
        </div>
        {/* Coupon */}
        <div className="flex items-center justify-between">
          <p>Coupon Discount</p>
          <Skeleton className="w-20 h-4" />
        </div>
      </div>

      <hr className="border" />

      <div className="pt-4">
        <div className="flex items-center justify-between font-semibold pb-3.5">
          <p>Total</p>
          <Skeleton className="w-24 h-4" />
        </div>
        <Button className="w-full flex items-center gap-2">Place Order</Button>
      </div>
    </section>
  );
};

export default OrderSummarySkeleton;
