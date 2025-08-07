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
    <div className=" border-b py-2">
      <div className="max-container flex items-center justify-between">
        {/* First Row */}
        <div className="flex items-center">
          <Image src="/logo.png" alt="Logo" width={70} height={70} />
          <p className="text-[22px] font-bold -ml-3 text-gray-700">Nexora</p>
        </div>
        {/* Second Row */}
        <ul className="flex items-center gap-12 font-semibold">
          {navLinks.map((nav) => (
            <li key={nav.link}>
              <Link href={nav.link}>{nav.title}</Link>
            </li>
          ))}
        </ul>
        {/* Third Row */}
        <NavButtons />
      </div>
    </div>
  );
};

export default Navbar;
