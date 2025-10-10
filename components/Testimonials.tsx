"use client";

import Image from "next/image";
import { Marquee } from "./ui/marquee";
import { testimonials } from "./testimonialData";
import { BoxReveal } from "./ui/box-reveal";

interface Props {
  name: string;
  email: string;
  img: string;
  review: string;
  stars: number;
}

const firstRow = testimonials.slice(0, 6);
const secondRow = testimonials.slice(6, 12);

const ReviewCard = ({ name, email, img, review, stars }: Props) => {
  return (
    <div className="relative h-full w-fit cursor-pointer overflow-hidden rounded-xl border-2 p-4 bg-white dark:bg-neutral-950 border-neutral-300 dark:border-neutral-800 hover:shadow-xl transition duration-150 ease-in">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          {/* <Image
            src={img}
            alt="profile"
            width={40}
            height={40}
            className="size-10 object-cover rounded-full"
          /> */}
          <div className="flex flex-col">
            <p className="font-medium">{name}</p>
            <p className="text-sm -mt-0.5 font-medium text-neutral-600 dark:text-neutral-400">
              {email}
            </p>
          </div>
        </div>
        <i className="ri-double-quotes-l text-xl text-neutral-500 dark:text-neutral-300"></i>
      </div>
      <p className="text-sm font-medium text-gray-700 dark:text-neutral-300 w-[300px] mt-2">
        {review}
      </p>
      <div className="flex mt-2 text-lg text-yellow-500">
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i}>{i < stars ? "★" : "☆"}</span>
        ))}
      </div>
    </div>
  );
};

const Testimonials = () => {
  return (
    <div className="py-16 bg-neutral-100 dark:bg-black">
      <div className="flex flex-col items-center justify-center text-center px-3  mb-8">
        <div className="border-2 border-yellow-400 dark:border-yellow-500 px-3 py-0.5 rounded-full text-xs font-medium">
          Testimonials
        </div>
        <BoxReveal boxColor={"#5046e6"} duration={1}>
          <h1 className="sm:text-4xl min-[350px]:text-3xl text-2xl font-semibold mt-2">
            Our{" "}
            <span className="text-blue-600 dark:text-blue-500">
              Testimonials
            </span>
          </h1>
        </BoxReveal>
        <BoxReveal boxColor={"#5046e6"} duration={1}>
          <p className="min-[350px]:text-base text-sm text-center mt-1 font-medium text-gray-600 dark:text-neutral-300">
            Hear what our happy customers are saying about their shopping
            experience. <br className="max-[664px]:hidden" /> Real stories, real
            satisfaction.
          </p>
        </BoxReveal>
      </div>
      <div className="max-w-6xl mx-auto px-4 w-full relative flex-col items-center justify-center overflow-hidden">
        <Marquee reverse pauseOnHover className="[--duration:35s]">
          {firstRow.map((review) => (
            <ReviewCard key={review.name} {...review} />
          ))}
        </Marquee>
        <Marquee pauseOnHover className="[--duration:35s]">
          {secondRow.map((review) => (
            <ReviewCard key={review.name} {...review} />
          ))}
        </Marquee>
        <div className="pointer-events-none absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-neutral-100 dark:from-black to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-neutral-100 dark:from-black to-transparent z-10" />
      </div>
    </div>
  );
};

export default Testimonials;
