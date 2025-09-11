import Image from "next/image";
import Link from "next/link";
import NavButtons from "./NavButtons";

export const navLinks = [
  { title: "Home", link: "/" },
  { title: "Shop", link: "/shop" },
  { title: "About", link: "/about" },
  { title: "Contact", link: "/contact" },
];

const Navbar = () => {
  return (
    <div className="fixed w-full top-0 border-b py-2 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-20">
      <div className="max-container flex items-center justify-between">
        {/* First Row */}
        <div className="flex items-center cm:gap-10 lg:gap-12">
          <Link href="/" className="flex items-center -ml-6">
            <Image
              src="/logo.png"
              alt="Logo"
              width={70}
              height={70}
              className="block dark:hidden"
            />
            <Image
              src="/logo-light.png"
              alt="Logo"
              width={70}
              height={70}
              className="hidden dark:block"
            />
            <p className="min-[400px]:text-[22px] text-[20px] font-bold -ml-3 text-black dark:text-neutral-50">
              Nexora
            </p>
          </Link>
          {/* Second Row */}
          <ul className="hidden cm:flex items-center gap-8 lg:gap-12 font-semibold">
            {navLinks.map((nav) => (
              <li
                key={nav.link}
                className="cursor-pointer hover:text-purple-700 transition-colors duration-200 ease-in"
              >
                <Link href={nav.link}>{nav.title}</Link>
              </li>
            ))}
          </ul>
        </div>
        {/* Third Row */}
        <NavButtons />
      </div>
    </div>
  );
};

export default Navbar;
