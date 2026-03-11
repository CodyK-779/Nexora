import { User } from "lucide-react";
import Link from "next/link";
import ProfileDropdown from "./ProfileDropdown";
import MobileMenu from "./MobileMenu";
import NavSearch from "./NavSearch";
import { ModeToggle } from "./ModeToggle";
import { SessionType } from "@/lib/sessionType";
import { Skeleton } from "./ui/skeleton";
import { Suspense } from "react";

interface Props {
  session: SessionType | null;
  isPending: Boolean;
}

const NavButtons = ({ session, isPending }: Props) => {
  return (
    <div className="flex items-center gap-4">
      <Suspense
        fallback={
          <div className="hidden sm:block cm:w-50 lg:w-72">
            <Skeleton className="w-full rounded-full h-9" />
          </div>
        }
      >
        <NavSearch />
      </Suspense>
      {isPending ? (
        <Skeleton className="size-9 rounded-full" />
      ) : session ? (
        <ProfileDropdown session={session} />
      ) : (
        <button>
          <Link href="/login" className="flex items-center gap-1.5">
            <User className="min-[340px]:size-5 size-[18px] font-medium" />
            <p className="min-[340px]:text-sm text-[13px] font-semibold">
              Account
            </p>
          </Link>
        </button>
      )}
      <ModeToggle />
      <MobileMenu />
    </div>
  );
};

export default NavButtons;
