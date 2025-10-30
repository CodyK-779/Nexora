import { Skeleton } from "../ui/skeleton";

const ProductSectionShell = () => {
  return (
    <section className="max-container grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 lg:gap-6 min-[500px]:gap-4 pb-20 min-[400px]:gap-3 gap-2">
      {[...Array(10)].map((_, i) => (
        <div key={i} className="flex flex-col min-[500px]:mb-0 mb-4">
          <Skeleton className="w-full aspect-square rounded-lg overflow-hidden border-2" />

          <div className="flex flex-col min-[400px]:mt-3.5 mt-3 mx-1">
            <Skeleton className="min-[400px]:h-3 h-2.5 w-full" />
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
        </div>
      ))}
    </section>
  );
};

export default ProductSectionShell;
