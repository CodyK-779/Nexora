import { User } from "lucide-react";
import Link from "next/link";
import ProfileDropdown from "./ProfileDropdown";
import MobileMenu from "./MobileMenu";
import { auth } from "../app/lib/auth";
import { headers } from "next/headers";
import NavSearch from "./NavSearch";
import { ModeToggle } from "./ModeToggle";

const NavButtons = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <div className="flex items-center gap-4">
      <NavSearch />
      {!session ? (
        <button>
          <Link href="/login" className="flex items-center gap-1.5">
            <User className="size-5 font-medium" />
            <p className="text-sm font-semibold">Account</p>
          </Link>
        </button>
      ) : (
        <ProfileDropdown />
      )}
      <ModeToggle />
      <MobileMenu />
    </div>
  );
};

export default NavButtons;
