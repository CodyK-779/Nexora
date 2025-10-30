import WishlistSearchShell from "./WishlistSearchShell";
import WishlistSkeleton from "./WishlistSkeleton";

const WishlistPageSkeleton = () => {
  return (
    <>
      <WishlistSearchShell />
      <WishlistSkeleton />
    </>
  );
};

export default WishlistPageSkeleton;
