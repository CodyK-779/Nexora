import { BoxReveal } from "../ui/box-reveal";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

const PopularProductsSkeleton = () => {
  return (
    <section className="py-12">
      <div className="max-container">
        {/* Section Header */}
        <div className="flex flex-col items-center justify-center text-center mb-10">
          <BoxReveal boxColor={"#5046e6"} duration={1}>
            <h2 className="md:text-4xl min-[400px]:text-3xl text-2xl font-semibold tracking-tight sm:text-4xl">
              Most{" "}
              <span className="text-blue-700 dark:text-blue-600">Popular</span>{" "}
              Items
            </h2>
          </BoxReveal>
          <BoxReveal boxColor={"#5046e6"} duration={1}>
            <p className="min-[350px]:text-base text-sm text-gray-500 dark:text-gray-400">
              Discover the best-selling products loved by our customers
            </p>
          </BoxReveal>
        </div>
        {/* Product Grid */}
        <div className="flex sm:grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 sm:gap-5 gap-4 overflow-x-auto sm:overflow-visible no-scrollbar pb-2">
          {[...Array(4)].map((_, i) => (
            <Card
              key={i}
              className="max-[640px]:max-w-[300px] max-[350px]:max-w-[285px] w-full relative rounded-2xl shadow-sm hover:shadow-lg transition-shadow border-2 flex-shrink-0"
            >
              {/* Product Image */}
              <Skeleton className="w-full h-48 overflow-hidden rounded-t-2xl border-b" />
              {/* Product Info */}
              <CardContent className="p-4">
                <div className="flex flex-col gap-2">
                  <Skeleton className="w-full h-7" />
                  <Skeleton className="w-full h-10" />
                </div>
                <div className="flex items-center justify-between mt-1.5">
                  <Skeleton className="mt-2 w-20 h-7" />
                  <Skeleton className="size-9 mt-1.5" />
                </div>
              </CardContent>

              {/* Actions */}
              <CardFooter className="flex min-[350px]:justify-between items-center p-4 gap-2">
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularProductsSkeleton;
