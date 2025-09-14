"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";

const slides = [
  {
    image: "/nike.png",
    category: "Shoes",
    title: "Nike Air High x Dior",
    desc: "Luxury meets legendary comfort - limited stock!",
    promo: "Sale Up to 33% OFF",
    linePrice: "$15,000,00",
    discount: "$9,999,99",
    margin: "-mb-4",
    link: "/product/73520229-db86-41aa-9a0c-b7fe11cf2c3e",
  },
  {
    image: "/macbook.png",
    category: "Macbook",
    title: "Macbook air m4",
    desc: "Ultra-light power with all-day battery life",
    promo: "Sale Up to 15% OFF",
    linePrice: "$1.199.99",
    discount: "$999,99",
    margin: "-mb-4",
    link: "/product/90bea6ab-a640-414e-86f9-ca349ec6646e",
  },
  {
    image: "/hoodie.png",
    category: "Clothes",
    title: "Black Hoodie",
    desc: "Premium cotton comfort meets urban style",
    promo: "Sale up to 15% OFF",
    linePrice: "$35.99",
    discount: "$29.99",
    margin: "mb-6",
    link: "/product/cfa7be9d-7657-4298-9a4c-828df9a094eb",
  },
  {
    image: "/ps5.png",
    category: "Console",
    title: "Play Station 5 Pro",
    desc: "4K 120fps gaming with immersive haptics",
    promo: "Sale up to 13% OFF",
    linePrice: "$749.99",
    discount: "$649,99",
    margin: "mb-8",
    link: "/",
  },
];

const HeroSection = () => {
  return (
    <div className="max-container py-10 cm:py-4 mt-[70px] cm:mt-20 relative w-full lg:rounded-xl bg-gradient-to-r from-gray-900 to-gray-800">
      <Swiper
        // navigation
        modules={[Navigation, Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 2500 }}
        loop
        className="h-[500px]"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="flex pb-10 cm:pb-0 flex-col-reverse cm:flex-row items-center justify-center cm:justify-between px-2 cm:px-8 lg:px-28 h-full text-white">
              {/* Text Content */}
              <div className="max-w-md text-center cm:text-left space-y-4 cm:space-y-6">
                <span className="inline-block px-3 py-1 text-xs font-semibold tracking-widest text-yellow-400 uppercase bg-gray-700 rounded-full">
                  {slide.category}
                </span>
                <h2 className="max-[450px]:text-2xl text-4xl lg:text-5xl font-bold leading-tight">
                  {slide.title}
                </h2>
                <p className="lg:text-xl min-[350px]:text-base text-sm text-gray-300">
                  {slide.desc}
                </p>
                <div className="flex items-center justify-center cm:justify-start gap-4">
                  <span className="sn:text-2xl min-[400px]:text-lg min-[360px]:text-base text-sm font-bold text-yellow-400">
                    {slide.promo}
                  </span>
                  <span className="font-medium min-[400px]:text-base text-sm">
                    {slide.discount}
                  </span>
                  <span className="min-[400px]:text-sm text-xs line-through text-gray-400">
                    {slide.linePrice}
                  </span>
                </div>
                <Button
                  asChild
                  className="font-bold px-6 rounded-full text-black bg-yellow-500 hover:bg-yellow-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  <Link href={slide.link}>Buy Now →</Link>
                </Button>
              </div>

              {/* Product Image */}
              <div
                className={`relative w-64 h-64 cm:w-[450px] cm:h-[450px] ${slide.margin} cm:mb-0`}
              >
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  className="object-contain"
                  priority
                />
                {/* Glow effect */}
                <div className="absolute inset-0 bg-blue-500/10 rounded-full blur-2xl -z-10"></div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroSection;
