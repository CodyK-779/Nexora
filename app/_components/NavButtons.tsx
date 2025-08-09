import { User } from "lucide-react";
import Link from "next/link";
import ProfileDropdown from "./ProfileDropdown";
import MobileMenu from "./MobileMenu";
import { OpenMenu } from "./Navbar";
import { auth } from "../lib/auth";
import { headers } from "next/headers";

const NavButtons = async ({ openMenu, setOpenMenu }: OpenMenu) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

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
      <MobileMenu openMenu={openMenu} setOpenMenu={setOpenMenu} />
    </div>
  );
};

export default NavButtons;
