import { Dispatch, SetStateAction } from "react";
import { Input } from "./ui/input";
import { Filter, Search } from "lucide-react";
import { ProductsType } from "./InterfaceTypes";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Category } from "@/app/generated/prisma";

interface Props {
  search: string;
  category: string;
  status: string;
  sortBy: string;
  products: ProductsType[];
  categories: Category[];
  filteredProducts: ProductsType[];
  setSearch: Dispatch<SetStateAction<string>>;
  setCategory: Dispatch<SetStateAction<string>>;
  setStatus: Dispatch<SetStateAction<string>>;
  setSortBy: Dispatch<SetStateAction<string>>;
}

const ProductFilter = ({
  search,
  setSearch,
  category,
  setCategory,
  status,
  setStatus,
  sortBy,
  setSortBy,
  filteredProducts,
  products,
  categories,
}: Props) => {
  return (
    <section className="bg-neutral-100 dark:bg-neutral-900 w-full mt-[69px] pt-10 pb-5 mb-10">
      <div className="max-container">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="sm:text-5xl min-[400px]:text-4xl min-[350px]:text-3xl text-2xl font-semibold text-gray-900 dark:text-white mb-2">
            Our{" "}
            <span className="text-blue-600 dark:text-blue-500">Products</span>
          </h1>
          <p className="min-[450px]:text-lg min-[376px]:text-base min-[335px]:text-sm text-xs font-medium text-gray-600 dark:text-gray-400">
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
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 w-full border dark:border-neutral-600 shadow"
              />
            </div>
            <div className="flex flex-wrap gap-4 items-center justify-center">
              {/* Category Filter */}
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="min-[460px]:w-[180px] w-full border dark:border-neutral-600 shadow">
                  <Filter className="h-4 w-4 mr-2 max-[460px]:hidden" />
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {/* Status Filter */}
              <Select value={status} onValueChange={setStatus}>
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
              <Select value={sortBy} onValueChange={setSortBy}>
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
          <p className="min-[375px]:text-sm text-xs text-gray-600 dark:text-gray-400">
            Showing {filteredProducts.length} of {products.length} products
          </p>
          <div className="min-[375px]:text-sm text-xs text-gray-600 dark:text-gray-400">
            Sorted by:{" "}
            {sortBy === "name"
              ? "Name"
              : sortBy === "price-low"
              ? "Price: Low to High"
              : sortBy === "price-high"
              ? "Price: High to Low"
              : "Rating"}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductFilter;
