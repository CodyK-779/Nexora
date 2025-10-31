import { Heart, LayoutDashboard, Settings } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import DropdownSignout from "./DropdownSignout";
import { getUserDetails } from "@/actions/user-action";
import Link from "next/link";
import Image from "next/image";

interface Props {
  userId: string;
}

const ProfileDropdown = async ({ userId }: Props) => {
  const user = await getUserDetails(userId);

  if (!user) return;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="relative size-9 rounded-full overflow-hidden cursor-pointer flex items-center justify-center bg-black text-white">
          {user.image ? (
            <Image
              src={user.image}
              alt={user.name}
              fill
              className="object-cover"
            />
          ) : (
            <p className="font-medium">{user.name.charAt(0).toUpperCase()}</p>
          )}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-72 py-2.5 rounded-xl mr-4 lg:mr-0">
        <DropdownMenuItem className="px-4 flex items-center gap-3 hover:bg-white">
          <div className="relative size-11 rounded-full overflow-hidden cursor-pointer flex items-center justify-center bg-black text-white">
            {user.image ? (
              <Image
                src={user.image}
                alt={user.name}
                fill
                className="object-cover"
              />
            ) : (
              <p className="font-medium text-lg">
                {user.name.charAt(0).toUpperCase()}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-0.5">
            <p className="text-sm font-medium">{user.name}</p>
            <p className="text-xs font-medium text-neutral-500 dark:text-neutral-300">
              {user.email}
            </p>
          </div>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="border border-neutral-100 dark:border-neutral-800" />
        <DropdownMenuGroup className="pt-2">
          <Link href={`/profile/${user.id}`}>
            <DropdownMenuItem className="flex items-center gap-3 px-4 py-2.5 cursor-pointer">
              <Settings className="size-8" />
              <p className="text-sm font-medium text-neutral-600 dark:text-neutral-100">
                Manage account
              </p>
            </DropdownMenuItem>
          </Link>
          {user.role === "ADMIN" && (
            <a href="/dashboard">
              <DropdownMenuItem className="flex items-center gap-3 px-4 py-2.5 cursor-pointer">
                <LayoutDashboard className="size-4" />
                <p className="text-sm font-medium text-neutral-600 dark:text-neutral-100">
                  Admin Dashboard
                </p>
              </DropdownMenuItem>
            </a>
          )}
          <Link href={`/cart/${user.id}`}>
            <DropdownMenuItem className="flex items-center gap-3 px-4 py-2.5 cursor-pointer">
              <i className="ri-shopping-cart-line text-[16px] font-medium"></i>
              <p className="text-sm font-medium text-neutral-600 dark:text-neutral-100">
                Cart
              </p>
            </DropdownMenuItem>
          </Link>
          <Link href={`/order/${user.id}`}>
            <DropdownMenuItem className="flex items-center gap-3 px-4 py-2.5 cursor-pointer">
              <i className="ri-shopping-bag-line text-[16px] font-medium"></i>
              <p className="text-sm font-medium text-neutral-600 dark:text-neutral-100">
                My Orders
              </p>
            </DropdownMenuItem>
          </Link>
          <Link href={`/wishlist/${user.id}`}>
            <DropdownMenuItem className="flex items-center gap-3 px-4 py-2.5 cursor-pointer">
              <Heart className="size-8" />
              <p className="text-sm font-medium text-neutral-600 dark:text-neutral-100">
                Wishlist
              </p>
            </DropdownMenuItem>
          </Link>
          <DropdownSignout />
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDropdown;
