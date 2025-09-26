"use client";

import {
  Home,
  ShoppingBag,
  Users,
  PlusSquare,
  LayoutDashboard,
  CheckSquareIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import DashSignout from "./DashSignout";

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
    { name: "Users", icon: Users, link: "/dashboard/users" },
    { name: "Add Product", icon: PlusSquare, link: "/dashboard/add-product" },
    { name: "Products", icon: ShoppingBag, link: "/dashboard/products" },
    {
      name: "Categories",
      icon: LayoutDashboard,
      link: "/dashboard/manage-categories",
    },
    { name: "Orders", icon: CheckSquareIcon, link: "/dashboard/orders" },
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
          <h1 className={`text-xl font-bold ${!isOpen && "lg:hidden"}`}>
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
                onClick={() => setIsMobileOpen(false)}
                className={`flex items-center gap-4 px-4 py-3 ${
                  isActive && "bg-neutral-100 dark:bg-neutral-700"
                }  transition-colors`}
              >
                <item.icon className="w-6 h-6" />
                <span className={`${!isOpen && "lg:hidden"} font-medium`}>
                  {item.name}
                </span>
              </Link>
            );
          })}
        </nav>
        <div className="lg:hidden mt-6 px-4">
          <DashSignout width />
        </div>
      </aside>
    </>
  );
};

export default DashSidebar;
