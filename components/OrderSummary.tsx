"use client";

import Link from "next/link";
import { Label } from "./ui/label";
import { useState } from "react";
import { Address } from "@/app/generated/prisma";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { toast } from "sonner";
import { formattedPrice } from "./PopularProducts";
import { Loader2 } from "lucide-react";
import { createOrder } from "@/actions/order-action";
import { useSession } from "@/app/lib/auth-client";
import { useRouter } from "next/navigation";

interface Props {
  addresses: Address[];
  totalItems: number;
  totalPrice: number;
  itemLength: number;
}

const OrderSummary = ({
  addresses,
  totalItems,
  totalPrice,
  itemLength,
}: Props) => {
  const { data: session } = useSession();
  const promoCodes = ["442005", "246810", "321541"];
  const [discount, setDiscount] = useState("$00.00");
  const [selectedAddress, setSelectedAddress] = useState("");
  const [addressId, setAddressId] = useState("");
  const [discounted, setDiscounted] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [promo, setPromo] = useState("");
  const router = useRouter();

  if (!session) return;

  const reset = () => {
    setSelectedAddress("");
    setAddressId("");
    setDiscounted(false);
    setPromo("");
  };

  const submitPromo = () => {
    if (!promo.trim()) {
      return toast.error("Promo code is empty");
    }

    const included = promoCodes.includes(promo);

    if (!included) {
      setPromo("");
      return toast.error("Invalid Promo Code");
    } else if (totalPrice <= 100) {
      setPromo("");
      return toast.error(
        "This promo code can only be applied if the total price is above $100"
      );
    } else {
      setPromo("");
      setDiscount("$100.00");
      setDiscounted(true);
      totalPrice - 100;
      toast.success("Promo Code Applied");
      return;
    }
  };

  const total = discount ? totalPrice - 100 : totalPrice;

  const handleOrder = async () => {
    if (itemLength === 0) return toast.error("Cart is empty");

    if (!addressId.trim()) return toast.error("Address is empty");

    setLoading(true);

    try {
      const result = await createOrder(
        session.user.id,
        addressId,
        total,
        `/cart/${session.user.id}`
      );

      if (result.success) {
        toast.success("Order placed successfully!");
        reset();
        router.push(`/order/${session.user.id}`);
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.error("Error placing order", error);
    } finally {
      setLoading(false);
    }
  };

  const updatedPrice = discounted
    ? formattedPrice(totalPrice - 100)
    : formattedPrice(totalPrice);

  return (
    <section className="min-[500px]:min-w-[400px] max-[500px]:w-full border p-4 rounded-md bg-neutral-50 dark:bg-neutral-950">
      <h3 className="font-semibold pb-3.5">Order Summary</h3>
      <hr className="border" />
      <div className="flex flex-col gap-2.5 pt-4">
        <Label className="font-medium">ADDRESS</Label>
        <div className="relative inline-block w-full text-sm border">
          <button
            className="peer w-full text-left px-4 pr-2 py-2 bg-white dark:bg-neutral-950 focus:outline-none"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <span className="font-medium">
              {selectedAddress ? selectedAddress : "Select Address"}
            </span>
            <svg
              className={`w-5 h-5 inline float-right transition-transform duration-200 ${
                isDropdownOpen ? "rotate-0" : "-rotate-90"
              }`}
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

          {isDropdownOpen && (
            <ul className="absolute w-full border shadow-md mt-1 z-10 py-1.5 bg-white dark:bg-neutral-900">
              {addresses.map((address) => (
                <li
                  key={address.id}
                  onClick={() => {
                    setIsDropdownOpen(false);
                    setAddressId(address.id);
                    setSelectedAddress(address.title);
                  }}
                  className="px-4 py-2 hover:bg-gray-500/10 font-medium cursor-pointer text-center"
                >
                  {address.title}
                </li>
              ))}
              <Link href="/address">
                <li className="px-4 py-2 hover:bg-gray-500/10 font-medium cursor-pointer text-center">
                  + Add New Address
                </li>
              </Link>
            </ul>
          )}
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
            value={promo}
            type="text"
            placeholder="Type here..."
            onChange={(e) => setPromo(e.target.value)}
            className="flex-1 border-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 rounded-l-full text-sm"
          />
          <Button
            type="button"
            size="sm"
            className="rounded-full px-5"
            onClick={submitPromo}
          >
            Apply
          </Button>
        </div>
      </div>

      <hr className="border" />

      <div className="flex flex-col gap-3.5 pt-5 text-sm font-medium pb-4">
        {/* Item count */}
        <div className="flex items-center justify-between">
          <p>Items</p>
          <p>{totalItems}</p>
        </div>
        {/* Sub total */}
        <div className="flex items-center justify-between">
          <p>Sub Total</p>
          <p>{formattedPrice(totalPrice)}</p>
        </div>
        {/* Shipping */}
        <div className="flex items-center justify-between">
          <p>Shipping</p>
          <p>Free</p>
        </div>
        {/* Taxes */}
        <div className="flex items-center justify-between">
          <p>Taxes</p>
          <p>$00.00</p>
        </div>
        {/* Coupon */}
        <div className="flex items-center justify-between">
          <p>Coupon Discount</p>
          <p>{discount}</p>
        </div>
      </div>

      <hr className="border" />

      <div className="pt-4">
        <div className="flex items-center justify-between font-semibold pb-3.5">
          <p>Total</p>
          <p>{updatedPrice}</p>
        </div>
        <Button
          className="w-full flex items-center gap-2"
          disabled={loading}
          onClick={handleOrder}
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin" />
              Loading...
            </>
          ) : (
            <p>Place Order</p>
          )}
        </Button>
      </div>
    </section>
  );
};

export default OrderSummary;
