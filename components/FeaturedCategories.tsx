import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
import { getAllCategories } from "@/actions/category-action";

const gradientBgClasses = (category: string) => {
  switch (category) {
    case "Electronics":
      return "bg-gradient-to-bl from-slate-900 via-blue-900 via-purple-800 to-fuchsia-700";
    case "Clothings":
      return "bg-gradient-to-br from-purple-900 via-fuchsia-800 via-pink-700 to-orange-500";
    case "Household":
      return "bg-gradient-to-l from-[#e966a0] via-[#2b2730] to-[#6554af]";
    case "Furniture":
      return "bg-gradient-to-t from-[#10a19d] via-[#540375] to-[#ff7000]";

    case "Sports":
      return "bg-gradient-to-t from-[#0a1931] via-[#185adb] to-[#ffc947]";
    case "Collectables":
      // return "bg-gradient-to-t from-[#4b4c7a] via-[#eb92fb] to-[#c855bc]";
      return "bg-gradient-to-br from-indigo-900 via-purple-800 via-fuchsia-700 to-cyan-500";
  }
};

const FeaturedCategories = async () => {
  const categories = await getAllCategories();

  return (
    <section className="py-16 cm:mt-10 bg-gray-100 dark:bg-neutral-900">
      <div className="max-container flex flex-col items-center justify-center">
        {/* Title */}
        <div className="text-center mb-10">
          <h2 className="md:text-4xl min-[400px]:text-3xl text-2xl font-semibold mb-2">
            Featured{" "}
            <span className="text-blue-700 dark:text-blue-600">Categories</span>
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
              className={`flex flex-col items-center max-[328px]:w-full w-[140px] p-4 rounded-xl ${gradientBgClasses(
                cat.name
              )} shadow-md hover:-translate-y-1 hover:shadow-xl hover:scale-105 transition-all duration-200 ease-in cursor-pointer`}
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
