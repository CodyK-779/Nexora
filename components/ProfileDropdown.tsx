import { Heart, LayoutDashboard, Settings } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import DropdownSignout from "./DropdownSignout";
import { auth } from "@/app/lib/auth";
import { headers } from "next/headers";
import { getUserDetails } from "@/actions/user-action";
import Link from "next/link";

const ProfileDropdown = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) return;

  const user = await getUserDetails(session.user.id);

  if (!user) return;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="size-9 cursor-pointer">
          <AvatarImage src={session.user.image!} />
          <AvatarFallback className="bg-black text-white dark:bg-neutral-800 font-medium">
            {session.user.name.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-72 py-2.5 rounded-xl mr-4 lg:mr-0">
        <DropdownMenuItem className="px-4 flex items-center gap-3 hover:bg-white">
          <Avatar className="size-11">
            <AvatarImage src={session.user.image!} />
            <AvatarFallback className="bg-black text-white text-lg dark:bg-neutral-800 font-medium">
              {session.user.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-0.5">
            <p className="text-sm font-medium">{session.user.name}</p>
            <p className="text-xs font-medium text-neutral-500 dark:text-neutral-300">
              {session.user.email}
            </p>
          </div>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="border border-neutral-100 dark:border-neutral-800" />
        <DropdownMenuGroup className="pt-2">
          <DropdownMenuItem className="flex items-center gap-3 px-4 py-2.5 cursor-pointer">
            <Settings className="size-8" />
            <p className="text-sm font-medium text-neutral-600 dark:text-neutral-100">
              Manage account
            </p>
          </DropdownMenuItem>
          {user.role === "ADMIN" && (
            <Link href="/dashboard">
              <DropdownMenuItem className="flex items-center gap-3 px-4 py-2.5 cursor-pointer">
                <LayoutDashboard className="size-4" />
                <p className="text-sm font-medium text-neutral-600 dark:text-neutral-100">
                  Admin Dashboard
                </p>
              </DropdownMenuItem>
            </Link>
          )}
          <DropdownMenuItem className="flex items-center gap-3 px-4 py-2.5 cursor-pointer">
            <i className="ri-shopping-cart-line text-[16px] font-medium"></i>
            <p className="text-sm font-medium text-neutral-600 dark:text-neutral-100">
              Cart
            </p>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center gap-3 px-4 py-2.5 cursor-pointer">
            <i className="ri-shopping-bag-line text-[16px] font-medium"></i>
            <p className="text-sm font-medium text-neutral-600 dark:text-neutral-100">
              My Orders
            </p>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center gap-3 px-4 py-2.5 cursor-pointer">
            <Heart className="size-8" />
            <p className="text-sm font-medium text-neutral-600 dark:text-neutral-100">
              Wishlist
            </p>
          </DropdownMenuItem>
          <DropdownSignout />
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDropdown;
