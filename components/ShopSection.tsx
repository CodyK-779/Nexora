"use client";

import { useState, useMemo, useEffect } from "react";
import { ProductsType, ShopWishListType } from "./InterfaceTypes";
import ProductFilter from "./ProductFilter";
import ProductSection from "./ProductSection";
import { Category } from "@/app/generated/prisma";
import { useSearchParams } from "next/navigation";

interface Props {
  categories: Category[];
  products: ProductsType[];
  wishlist: ShopWishListType | null;
}

export default function ShopSection({ products, categories, wishlist }: Props) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string>("all");
  const [status, setStatus] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("name");
  const searchParams = useSearchParams();

  useEffect(() => {
    const q = searchParams.get("product") || "";
    setSearch(q);
  }, [searchParams]);

  const filteredProducts = useMemo(() => {
    let filtered = products.filter((product) => {
      const matchSearch =
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.description.toLowerCase().includes(search.toLowerCase());
      const matchCategory =
        category === "all" || product.categoryId === category;
      const matchStatus = status === "all" || product.status === status;
      return matchSearch && matchCategory && matchStatus;
    });

    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "name":
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return filtered;
  }, [search, category, status, sortBy, products]);

  return (
    <>
      {/* Filters Bar */}
      <ProductFilter
        search={search}
        category={category}
        status={status}
        sortBy={sortBy}
        setSearch={setSearch}
        setCategory={setCategory}
        setStatus={setStatus}
        setSortBy={setSortBy}
        categories={categories}
        filteredProducts={filteredProducts}
        products={products}
      />

      {/* Product Grid/List */}
      <ProductSection filteredProducts={filteredProducts} wishlist={wishlist} />
    </>
  );
}
