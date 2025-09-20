"use client";

import Link from "next/link";
import { Label } from "./ui/label";
import { useState } from "react";

const OrderSummary = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <section className="min-w-[400px] border p-4 rounded-md">
      <h3 className="font-semibold pb-3.5">Order Summary</h3>
      <hr className="border" />
      <div className="flex flex-col gap-2.5 pt-4">
        <Label>Select Address</Label>
        <div className="relative inline-block w-full text-sm border">
          <button
            className="peer w-full text-left px-4 pr-2 py-2 bg-white text-gray-700 focus:outline-none"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <span className="font-medium">Select Address</span>
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
            <ul className="absolute w-full border shadow-md mt-1 z-10 py-1.5">
              {/* {userAddresses.map((address, index) => (
                <li
                  key={index}
                  className="px-4 py-2 hover:bg-gray-500/10 cursor-pointer"
                  onClick={() => handleAddressSelect(address)}
                >
                  {address.fullName}, {address.area}, {address.city},{" "}
                  {address.state}
                </li>
              ))} */}
              <Link href="/address">
                <li
                  // onClick={() => router.push("/add-address")}
                  className="px-4 py-2 hover:bg-gray-500/10 font-medium cursor-pointer text-center"
                >
                  + Add New Address
                </li>
              </Link>
            </ul>
          )}
        </div>
      </div>
    </section>
  );
};

export default OrderSummary;
