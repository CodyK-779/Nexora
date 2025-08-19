"use client";

import { Home, BarChart, ShoppingBag, Users, Settings } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
  isOpen: boolean;
  isMobileOpen: boolean;
  setIsOpen: (fun: boolean) => void;
  setIsMobileOpen: (fun: boolean) => void;
}

const DashSidebar = ({
  isOpen,
  isMobileOpen,
  setIsOpen,
  setIsMobileOpen,
}: Props) => {
  const menuItems = [
    { name: "Dashboard", icon: Home, link: "/dashboard" },
    { name: "Analytics", icon: BarChart, link: "/dashboard/analytics" },
    { name: "Products", icon: ShoppingBag, link: "/dashboard/products" },
    { name: "Users", icon: Users, link: "/dashboard/users" },
    { name: "Settings", icon: Settings, link: "/dashboard/settings" },
  ];

  const pathname = usePathname();

  return (
    <>
      {/* Mobile overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-20 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      <aside
        className={`
          fixed mt-16 top-0 left-0 h-full border-r dark:border-r-2 bg-white dark:bg-neutral-950 shadow-lg
          transition-all duration-300 z-20
          ${
            isMobileOpen
              ? "translate-x-0 w-64"
              : "-translate-x-full lg:translate-x-0"
          }
          ${isOpen ? "lg:w-64" : "lg:w-fit"}
        `}
      >
        {/* Logo / Title */}
        <div className="flex items-center justify-between pt-6 p-4 border-b-2 border-neutral-200 dark:border-neutral-700">
          <h1 className={`text-xl font-bold ${!isOpen && "cm:hidden"}`}>
            Admin Panel
          </h1>
          {/* Only desktop toggle */}
          <button
            className="hidden lg:block text-gray-400 hover:text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            <Image
              src="/expand.png"
              alt="expand"
              width={25}
              height={25}
              className={`${
                isOpen && "rotate-180"
              } block dark:hidden transition-all duration-200 ease-in`}
            />
            <Image
              src="/expand-light.png"
              alt="expand"
              width={25}
              height={25}
              className={`${
                isOpen && "rotate-180"
              } hidden dark:block transition-all duration-200 ease-in`}
            />
            {/* {isOpen ? <X /> : <Menu />} */}
          </button>
        </div>

        {/* Menu */}
        <nav className="mt-6 flex flex-col gap-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.link;

            return (
              <Link
                key={item.name}
                href={item.link}
                className={`flex items-center gap-4 px-4 py-3 ${
                  isActive && "bg-neutral-200 dark:bg-neutral-700"
                }  transition-colors`}
              >
                <item.icon className="w-6 h-6" />
                <span className={`${!isOpen && "cm:hidden"} font-medium`}>
                  {item.name}
                </span>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
};

export default DashSidebar;
