"use client";

import { useEffect, useState } from "react";
import { Heart, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "./ui/card";
import { TabsContent } from "./ui/tabs";
import { WishListTabType } from "./InterfaceTypes";
import { formattedPrice } from "./PopularProducts";
import Image from "next/image";
import Link from "next/link";
import WishlistTabBtns from "./WishlistTabBtns";
import { Badge } from "./ui/badge";
import { Status } from "@/app/generated/prisma";

interface Props {
  userId: string;
  wishlist: WishListTabType | null;
}

const WishListTab = ({ userId, wishlist }: Props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Calculate pagination values
  const totalItems = wishlist?.items.length || 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;

  const currentItems =
    wishlist?.items.slice(startIndex, startIndex + itemsPerPage) || [];

  // Pagination handlers
  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const goToPrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    // Adjust if we're at the start or end
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  useEffect(() => {
    if (wishlist && currentPage > 1) {
      const totalItems = wishlist.items.length;
      const totalPages = Math.ceil(totalItems / itemsPerPage);

      // If current page no longer has items, go back one page
      if (currentPage > totalPages) {
        setCurrentPage(totalPages);
      }
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [wishlist, currentPage]);

  const statusColor = (status: Status) => {
    switch (status) {
      case "Popular":
        return "bg-gradient-to-br from-purple-900 via-fuchsia-800 via-pink-700 to-orange-500 text-white rounded-full";
      case "BestSeller":
        return "bg-gradient-to-br from-indigo-900 via-purple-800 via-fuchsia-700 to-cyan-500 text-white rounded-full";
      case "New":
        return "bg-gradient-to-bl from-slate-900 via-blue-900 via-purple-800 to-fuchsia-700 text-white rounded-full";
    }
  };

  if (!wishlist || wishlist.items.length === 0) {
    return (
      <TabsContent value="wishlist" className="space-y-6">
        <Card className="border-0 shadow-lg dark:bg-gray-900">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5" />
              My Wishlist
            </CardTitle>
            <CardDescription className="font-medium">
              Products you've saved for later
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Your wishlist is empty
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Start adding products you love to your wishlist
              </p>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    );
  }

  return (
    <TabsContent value="wishlist" className="space-y-6">
      <Card className="border-0 shadow-lg dark:bg-gray-900">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5" />
            My Wishlist
          </CardTitle>
          <CardDescription className="min-[350px]:text-sm text-[13px] font-medium pt-1.5">
            Products saved for later • Page {currentPage} of {totalPages}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Products Grid */}
          <div className="grid xl:grid-cols-3 min-[1160px]:grid-cols-4 min-[890px]:grid-cols-3 sm:grid-cols-2 gap-4 max-[330px]:-mx-4">
            {currentItems.map((item) => (
              <Card
                key={item.id}
                className="group border shadow hover:shadow-lg transition-all"
              >
                <CardContent className="p-4">
                  <Link href={`/product/${item.product.id}`}>
                    <div className="relative aspect-square rounded-lg mb-3 overflow-hidden border group shadow">
                      <Image
                        src={item.product.images[0]}
                        alt="Product Image"
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 768px, 1024px"
                        className="object-cover group-hover:scale-105 transition-transform duration-300 ease-in"
                      />
                      {item.product.status !== "Normal" && (
                        <div className="absolute top-1.5 right-2.5">
                          <Badge
                            textSize="text-[10.5px]"
                            className={statusColor(item.product.status)}
                          >
                            {item.product.status}
                          </Badge>
                        </div>
                      )}
                    </div>
                  </Link>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1 line-clamp-1">
                      {item.product.name}
                    </h3>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        {item.product.category.name}
                      </p>
                      <span className="font-bold text-gray-900 dark:text-white">
                        {formattedPrice(item.product.price)}
                      </span>
                    </div>
                    <WishlistTabBtns
                      userId={userId}
                      productId={item.product.id}
                      itemId={item.id}
                      inventory={item.product.inventory}
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
              {/* Page Info */}
              <div className="min-[330px]:text-sm text-xs font-medium text-gray-600 dark:text-gray-400">
                Showing {startIndex + 1}–
                {Math.min(startIndex + itemsPerPage, totalItems)} out of{" "}
                {totalItems} saved products
              </div>

              {/* Pagination Buttons */}
              <div className="flex items-center gap-2">
                {/* Previous Button */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={goToPrevPage}
                  disabled={currentPage === 1}
                  className="flex items-center gap-1"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Button>

                {/* Page Numbers */}
                <div className="hidden md:flex items-center gap-2">
                  {getPageNumbers().map((page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      size="sm"
                      onClick={() => goToPage(page)}
                      className="min-w-[40px]"
                    >
                      {page}
                    </Button>
                  ))}
                </div>
                {/* Next Button */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages}
                  className="flex items-center gap-1"
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default WishListTab;

/*



*/
