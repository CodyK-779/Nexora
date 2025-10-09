"use client";

import Image from "next/image";
import { ProductsType } from "./InterfaceTypes";
import { Card, CardContent, CardFooter } from "./ui/card";
import { categoryColors, formattedPrice } from "./PopularProducts";
import { Badge } from "./ui/badge";
import HeartIcon from "./HeartIcon";
import PopularAddToCart from "./PopularAddToCart";
import { Button } from "./ui/button";
import Link from "next/link";
import { ExternalLink, Eye, ShoppingCart } from "lucide-react";
import { WishListItem } from "@/app/generated/prisma";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { useState } from "react";

interface Props {
  products: ProductsType[];
  wishList:
    | {
        id: string;
        userId: string;
        createdAt: Date;
        updatedAt: Date;
        items: WishListItem[];
      }
    | undefined;
}

const PopularProductCarousel = ({ wishList, products }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div className="w-full space-y-6">
      {/* Header with progress */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Featured Products</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Showing {currentIndex + 1} of {Math.ceil(products.length / 4)}
          </p>
        </div>

        {/* Desktop Navigation */}
        {/* <div className="hidden sm:flex items-center gap-2">
          <CarouselPrevious />
          <CarouselNext />
        </div> */}
      </div>

      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
        // onSelect={(api) => setCurrentIndex(api.selectedScrollSnap())}
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {products.map((p) => (
            <CarouselItem
              key={p.id}
              className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
            >
              <Card className="group h-full relative rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border-2 hover:border-blue-300 dark:hover:border-blue-600 mx-auto">
                {/* Product Image */}
                <div className="relative w-full aspect-square overflow-hidden rounded-t-2xl border-b dark:bg-white">
                  <Image
                    src={p.images[0]}
                    alt="Product Image"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 768px, 1024px"
                    className="object-contain group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-2 right-2.5">
                    <Badge
                      textSize="text-[10px]"
                      className={categoryColors(p.category.name)}
                    >
                      {p.category.name}
                    </Badge>
                  </div>

                  {/* Quick Actions Overlay */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 flex items-center justify-center space-x-2 opacity-0 group-hover:opacity-100">
                    <Button
                      size="sm"
                      className="bg-white text-black hover:bg-gray-100"
                      onClick={() => {
                        /* Quick add to cart */
                      }}
                    >
                      <ShoppingCart className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      className="bg-white text-black hover:bg-gray-100"
                      asChild
                    >
                      <Link href={`/product/${p.id}`}>
                        <Eye className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>

                {/* Product Info */}
                <CardContent className="p-4 flex-1">
                  <h3 className="font-semibold sm:text-lg text-base line-clamp-1 mb-2">
                    {p.name}
                  </h3>
                  <p className="min-[350px]:text-sm text-xs text-neutral-500 dark:text-neutral-400 line-clamp-2 mb-3">
                    {p.description}
                  </p>
                  <div className="flex items-center justify-between mt-auto">
                    <p className="font-bold min-[350px]:text-xl text-lg">
                      {formattedPrice(p.price)}
                    </p>
                    <HeartIcon productId={p.id} wishList={wishList} />
                  </div>
                </CardContent>

                {/* Actions */}
                <CardFooter className="flex min-[350px]:justify-between items-center p-4 gap-2 border-t">
                  <PopularAddToCart productId={p.id} />
                  <Button
                    asChild
                    size="sm"
                    variant="outline"
                    className="w-full"
                  >
                    <Link
                      href={`/product/${p.id}`}
                      className="flex items-center gap-2.5 font-medium"
                    >
                      <ExternalLink size={16} />
                      <p>Details</p>
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Mobile Navigation & Dots */}
        <div className="flex items-center justify-center gap-4 mt-6 sm:hidden">
          <CarouselPrevious />
          <Carousel />
          <CarouselNext />
        </div>

        {/* Desktop Dots */}
        <div className="hidden sm:flex justify-center mt-6">
          <Carousel />
        </div>
      </Carousel>
    </div>
  );
};

export default PopularProductCarousel;

/*



*/
