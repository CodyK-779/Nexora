import { Input } from "./ui/input";
import { Filter, Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Skeleton } from "./ui/skeleton";

const ProductFilterShell = () => {
  return (
    // bg-neutral-100 dark:bg-neutral-900
    <section className="w-full mt-[69px] pt-10 pb-5 mb-10 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800">
      <div className="max-container">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="sm:text-5xl min-[400px]:text-4xl min-[350px]:text-3xl text-white text-2xl font-semibold mb-2">
            Our{" "}
            <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              Products
            </span>
          </h1>
          <p className="min-[450px]:text-lg min-[376px]:text-base min-[335px]:text-sm text-xs font-medium text-neutral-200">
            Discover amazing products at great prices
          </p>
        </div>
        <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-sm border p-6 mb-5">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search with Icon */}
            <div className="relative w-full lg:w-1/4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search products..."
                className="pl-10 w-full border dark:border-neutral-600 shadow"
              />
            </div>
            <div className="flex flex-wrap gap-4 items-center justify-center">
              {/* Category Filter */}
              <Select>
                <SelectTrigger className="min-[460px]:w-[180px] w-full border dark:border-neutral-600 shadow">
                  <Filter className="h-4 w-4 mr-2 max-[460px]:hidden" />
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                </SelectContent>
              </Select>
              {/* Status Filter */}
              <Select>
                <SelectTrigger className="min-[460px]:w-[180px] w-full border dark:border-neutral-600 shadow">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Popular">Popular</SelectItem>
                  <SelectItem value="New">New Arrivals</SelectItem>
                  <SelectItem value="Bestseller">Bestseller</SelectItem>
                </SelectContent>
              </Select>
              {/* Sort By */}
              <Select>
                <SelectTrigger className="min-[460px]:w-[180px] w-full border dark:border-neutral-600 shadow">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Name A-Z</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        {/* Results Info */}
        <div className="flex justify-between items-center font-medium mx-1">
          <Skeleton className="h-3 w-44" />
          <Skeleton className="h-3 w-32" />
        </div>
      </div>
    </section>
  );
};

export default ProductFilterShell;
