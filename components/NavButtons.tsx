import { User } from "lucide-react";
import Link from "next/link";
import ProfileDropdown from "./ProfileDropdown";
import MobileMenu from "./MobileMenu";
import { auth } from "../app/lib/auth";
import NavSearch from "./NavSearch";
import { ModeToggle } from "./ModeToggle";
import { headers } from "next/headers";

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
            <User className="min-[340px]:size-5 size-[18px] font-medium" />
            <p className="min-[340px]:text-sm text-[13px] font-semibold">
              Account
            </p>
          </Link>
        </button>
      ) : (
        <ProfileDropdown userId={session.user.id} />
      )}
      <ModeToggle />
      <MobileMenu />
    </div>
  );
};

export default NavButtons;
