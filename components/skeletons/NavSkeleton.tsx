import MobileMenu from "../MobileMenu";
import { ModeToggle } from "../ModeToggle";
import { Skeleton } from "../ui/skeleton";

const NavSkeleton = () => {
  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center">
        <div className="hidden sm:block cm:w-50 lg:w-72">
          <Skeleton className="w-full rounded-full h-9" />
        </div>
      </div>
      <Skeleton className="size-9 rounded-full" />
      <ModeToggle />
      <MobileMenu />
    </div>
  );
};

export default NavSkeleton;
