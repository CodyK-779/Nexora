"use cache";

import Image from "next/image";
import Link from "next/link";
import { getAllCategories } from "@/actions/category-action";
import { cacheLife } from "next/cache";

const Footer = async () => {
  cacheLife("hours");
  const categories = await getAllCategories();

  const navLinks = [
    { title: "Home", link: "/" },
    { title: "Shop", link: "/shop" },
    { title: "About", link: "/about" },
    { title: "Contact", link: "/contact" },
  ];

  return (
    <section className="w-full border-t-2 py-8 border-neutral-300 dark:border-neutral-800 bg-neutral-100 dark:bg-black">
      <div className="max-container grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 items-start pb-8 gap-4">
        {/* First Row */}
        <div className="flex flex-col">
          <div className="flex items-center gap-2 -ml-6">
            <Image
              src="/logo.png"
              alt="Logo"
              width={85}
              height={85}
              className="block dark:hidden"
            />
            <Image
              src="/logo-light.png"
              alt="Logo"
              width={85}
              height={85}
              className="hidden dark:block"
            />
            <p className="text-2xl font-bold -ml-6">Nexora</p>
          </div>
          <p className="text-sm font-medium -mt-1 text-neutral-600 dark:text-neutral-300">
            At Nexora, we believe shopping should be simple, inspiring, and
            reliable. That’s why we offer only the best at prices you’ll love.
          </p>
        </div>

        {/* Second Row */}
        <div className="flex flex-col md:items-center items-start mt-4 gap-2">
          <p className="font-semibold text-xl mb-2">Links</p>
          <ul className="flex flex-col md:items-center items-start gap-3 font-medium text-sm">
            {navLinks.map((link) => (
              <li
                key={link.link}
                className="cursor-pointer text-neutral-600 dark:text-neutral-300 hover:text-blue-600 dark:hover:text-blue-500 transition-colors duration-200 ease-in"
              >
                <Link href={link.link}>{link.title}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Third Row */}
        <div className="flex flex-col md:items-center items-start mt-4 gap-2">
          <p className="font-semibold text-xl mb-2">Categories</p>
          <ul className="flex flex-col md:items-center items-start gap-3 font-medium text-sm">
            {categories.map((cat) => (
              <li
                key={cat.id}
                className="cursor-pointer text-neutral-600 dark:text-neutral-300 hover:text-blue-600 dark:hover:text-blue-500 transition-colors duration-200 ease-in"
              >
                {cat.name}
              </li>
            ))}
          </ul>
        </div>

        {/* Fourth Row */}
        <div className="flex flex-col mt-4">
          <h1 className="text-xl font-bold">Follow our socials</h1>
          <p className="text-sm text-neutral-600 dark:text-neutral-300 font-medium mt-2">
            By following our socials you can stay up to date on new release
            products.
          </p>
          <div className="flex items-center mt-4 gap-3">
            <i className="ri-github-fill text-2xl cursor-pointer"></i>
            <i className="ri-facebook-circle-fill text-2xl cursor-pointer"></i>
            <i className="ri-twitter-x-line text-xl cursor-pointer"></i>
            <i className="ri-instagram-line text-xl cursor-pointer"></i>
          </div>
        </div>
      </div>
      <hr className="border border-neutral-300 dark:border-neutral-800 mb-8" />
      {/* Footer */}
      <div className="max-container font-medium text-neutral-600 dark:text-neutral-300 flex md:flex-row flex-col gap-1.5 items-center justify-center">
        <p className="min-[350px]:text-base text-sm">
          © 2025 Nexora All rights reserved.{" "}
          <span className="mx-4 hidden cm:inline-block">|</span>
        </p>
        <div className="flex items-center gap-4 text-xs min-[375px]:text-sm md:text-base">
          <p className="hover:underline cursor-pointer">Privacy Policy</p>
          <p className="hover:underline cursor-pointer">Terms of Service</p>
          <p className="hover:underline cursor-pointer">Contact Us</p>
        </div>
      </div>
    </section>
  );
};

export default Footer;
