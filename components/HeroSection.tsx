"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";

const slides = [
  {
    image: "/nike.png",
    category: "Shoes",
    title: "Nike Air Jordan 1 High x Dior",
    desc: "Luxury meets legendary comfort - limited stock!",
    promo: "Sale Up to 15% OFF",
    link: "/",
  },
  {
    image: "/macbook.png",
    category: "Macbook",
    title: "Macbook air m4",
    desc: "Ultra-light power with all-day battery life",
    promo: "Sale Up to 15% OFF",
    link: "/",
  },
  {
    image: "/hoodie.png",
    category: "Clothes",
    title: "Black Hoodie",
    desc: "Premium cotton comfort meets urban style",
    promo: "Sale up to 30% OFF",
    link: "/",
  },
  {
    image: "/ps5.png",
    category: "Console",
    title: "Ps5 Pro",
    desc: "4K 120fps gaming with immersive haptics",
    promo: "Sale up to 15% OFF",
    link: "/",
  },
];

const HeroSection = () => {
  return (
    <div className="max-container py-10 lg:py-4 mt-20 relative w-full lg:rounded-xl bg-gradient-to-r from-gray-900 to-gray-800">
      <Swiper
        // navigation
        modules={[Navigation, Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        loop
        className="h-[400px] lg:h-[500px]"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="flex flex-col-reverse lg:flex-row items-center justify-center lg:justify-between px-6 lg:px-32 h-full text-white">
              {/* Text Content */}
              <div className="max-w-md text-center lg:text-left space-y-4 lg:space-y-6">
                <span className="inline-block px-3 py-1 text-xs font-semibold tracking-widest text-yellow-400 uppercase bg-gray-700 rounded-full">
                  {slide.category}
                </span>
                <h2 className="text-4xl lg:text-5xl font-bold leading-tight">
                  {slide.title}
                </h2>
                <p className="text-lg lg:text-xl text-gray-300">{slide.desc}</p>
                <div className="flex items-center justify-center lg:justify-start gap-4">
                  <span className="text-2xl font-bold text-yellow-400">
                    {slide.promo}
                  </span>
                  <span className="text-sm line-through text-gray-400">
                    $1,299.00
                  </span>
                </div>
                <button className="mt-2 bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg">
                  Buy Now →
                </button>
              </div>

              {/* Product Image */}
              <div className="relative w-64 h-64 lg:w-[450px] lg:h-[450px] mb-8 lg:mb-0">
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
