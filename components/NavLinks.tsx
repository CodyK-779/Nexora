"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { title: "Home", link: "/" },
  { title: "Shop", link: "/shop" },
  { title: "About", link: "/about" },
  { title: "Contact", link: "/contact" },
];

const NavLinks = () => {
  const pathname = usePathname();

  return (
    <ul className="hidden cm:flex items-center gap-8 lg:gap-12 font-semibold">
      {navLinks.map((nav) => {
        const isActive = pathname === nav.link;

        return (
          <li
            key={nav.link}
            className={`cursor-pointer ${
              isActive && "text-blue-600 dark:text-blue-500"
            } hover:text-blue-600 dark:hover:text-blue-500 transition-colors duration-200 ease-in`}
          >
            <Link href={nav.link}>{nav.title}</Link>
          </li>
        );
      })}
    </ul>
  );
};

export default NavLinks;
