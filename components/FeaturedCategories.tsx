import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
import { getAllCategories } from "@/actions/category.action";

const gradientBgClasses = [
  "bg-gradient-to-br from-purple-900 via-violet-800 to-indigo-900",
  "bg-gradient-to-br from-rose-900 via-pink-800 to-red-900",
  "bg-gradient-to-br from-emerald-900 via-teal-800 to-cyan-900",
  "bg-gradient-to-br from-amber-900 via-orange-800 to-yellow-900",
  "bg-gradient-to-br from-sky-900 via-blue-800 to-indigo-900",
  "bg-gradient-to-br from-lime-900 via-green-800 to-emerald-900",
  "bg-gradient-to-br from-fuchsia-900 via-purple-800 to-violet-900",
];

const FeaturedCategories = async () => {
  const categories = await getAllCategories();

  return (
    <section className="py-16 cm:mt-10 bg-gray-100 dark:bg-neutral-900">
      <div className="max-container flex flex-col items-center justify-center">
        {/* Title */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            Featured Categories
          </h2>
          <p className="text-gray-500 dark:text-neutral-300">
            Browse our most popular collections
          </p>
        </div>
        {/* Categories */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          {categories.map((cat, index) => (
            <div
              key={cat.id}
              className={`flex flex-col items-center max-[328px]:w-full w-[140px] p-4 rounded-xl ${
                gradientBgClasses[index % gradientBgClasses.length]
              } shadow-md hover:-translate-y-1 hover:shadow-xl hover:scale-105 transition-all duration-200 ease-in cursor-pointer`}
            >
              <div className="p-3.5 bg-neutral-50 rounded-full mb-4">
                <Image
                  src={cat.image}
                  alt="category img"
                  width={45}
                  height={45}
                />
              </div>
              <p className="text-sm font-semibold text-white">{cat.name}</p>
            </div>
          ))}
        </div>
        {categories.length > 6 && (
          <div className="flex items-center justify-center mt-10">
            <Button asChild className="px-6 rounded-full">
              <Link href="/">View All Categories</Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedCategories;
