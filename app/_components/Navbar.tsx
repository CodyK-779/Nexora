import Image from "next/image";
import Link from "next/link";
import NavButtons from "./NavButtons";

export interface OpenMenu {
  openMenu: boolean;
  setOpenMenu: (fun: boolean) => void;
}

export const navLinks = [
  { title: "Home", link: "/" },
  { title: "Shop", link: "/shop" },
  { title: "About", link: "/about" },
  { title: "Contact", link: "/contact" },
];

const Navbar = ({ openMenu, setOpenMenu }: OpenMenu) => {
  return (
    <div className="border-b py-2">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        {/* First Row */}
        <div className="flex items-center -ml-6">
          <Image src="/logo.png" alt="Logo" width={70} height={70} />
          <p className="text-[22px] font-bold -ml-3 text-purple-700">Nexora</p>
        </div>
        {/* Second Row */}
        <ul className="hidden lg:flex items-center gap-12 font-semibold text-neutral-500">
          {navLinks.map((nav) => (
            <li
              key={nav.link}
              className="cursor-pointer hover:text-purple-700 transition-colors duration-200 ease-in"
            >
              <Link href={nav.link}>{nav.title}</Link>
            </li>
          ))}
        </ul>
        {/* Third Row */}
        <NavButtons openMenu={openMenu} setOpenMenu={setOpenMenu} />
      </div>
    </div>
  );
};

export default Navbar;
