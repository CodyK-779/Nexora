import { Skeleton } from "../ui/skeleton";

const NavLinksSkeleton = () => {
  return (
    <ul className="hidden cm:flex items-center gap-8 lg:gap-12 font-semibold">
      {[...Array(4)].map((_, i) => (
        <Skeleton key={i} className="h-4 w-14" />
      ))}
    </ul>
  );
};

export default NavLinksSkeleton;
