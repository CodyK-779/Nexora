"use client";

import { useSession } from "@/app/lib/auth-client";
import { User } from "lucide-react";
import Link from "next/link";
import ProfileDropdown from "./ProfileDropdown";

const NavButtons = () => {
  const { data: session } = useSession();

  return (
    <div className="flex items-center gap-4">
      {!session ? (
        <button className="px-3.5 py-2 rounded-full hover:bg-gray-800 hover:text-white transition-colors duration-200 ease-in">
          <Link href="/login" className="flex items-center gap-1.5">
            <User className="size-5 font-medium" />
            <p className="text-sm font-semibold">Account</p>
          </Link>
        </button>
      ) : (
        <ProfileDropdown />
      )}
      <Link href="/cart" className="flex items-center gap-2">
        <i className="ri-shopping-cart-line text-lg font-medium"></i>
        <p className="text-sm font-semibold">Cart</p>
      </Link>
    </div>
  );
};

export default NavButtons;
