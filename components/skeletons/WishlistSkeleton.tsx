import { Skeleton } from "../ui/skeleton";

interface Props {
  itemCount: number | undefined;
}

const WishlistSkeleton = ({ itemCount }: Props) => {
  return (
    <section className="max-container sm:py-20 py-16">
      {itemCount && itemCount > 0 ? (
        <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 lg:gap-6 min-[500px]:gap-4 min-[400px]:gap-3 gap-2">
          {[...Array(itemCount)].map((_, i) => (
            <div key={i} className="flex flex-col min-[500px]:mb-0 mb-4">
              <Skeleton className="w-full aspect-square rounded-xl overflow-hidden border-2" />

              <Skeleton className="min-[400px]:mt-3.5 mt-3 mx-1 min-[400px]:h-3 h-2.5 w-full" />
              <Skeleton className="mt-2 mx-1 h-2.5 w-full" />
              <div className="flex items-center justify-between mt-2 mx-1">
                <Skeleton className="min-[400px]:h-3 min-[400px]:w-[84px] h-2.5 w-16" />
                <Skeleton className="min-[400px]:h-4 min-[400px]:w-20 h-3 w-16" />
              </div>
              <div className="flex flex-col min-[500px]:flex-row items-center min-[500px]:gap-1.5 gap-2 mt-2 w-full">
                <Skeleton className="min-[400px]:h-8 h-7 w-full" />
                <Skeleton className="min-[400px]:h-8 h-7 w-full" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <h1 className="sm:text-3xl min-[400px]:text-2xl min-[350px]:text-xl text-lg font-medium text-center pt-[140px]">
          No wishlist items found
        </h1>
      )}
    </section>
  );
};

export default WishlistSkeleton;
