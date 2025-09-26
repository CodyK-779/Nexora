"use client";

import { X } from "lucide-react";
import { useMenu } from "./MenuProvider";
import { ModeToggle } from "./ModeToggle";
import Link from "next/link";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useSession } from "@/app/lib/auth-client";
import { usePathname } from "next/navigation";
import SideSignout from "./SideSignout";

const navLinks = [
  { title: "Home", link: "/" },
  { title: "Shop", link: "/shop" },
  { title: "About", link: "/about" },
  { title: "Contact", link: "/contact" },
];

const sidebarStyles =
  "cm:hidden fixed top-0 right-0 rounded-md z-30 min-h-screen w-[350px] max-[640px]:w-full bg-white/80 dark:bg-neutral-900/70 backdrop-blur-md shadow transition-transform duration-200 ease-in";

const Sidebar = () => {
  const { data: session } = useSession();
  const { openMenu, setOpenMenu } = useMenu();
  const pathname = usePathname();

  const handleClose = () => setOpenMenu(false);

  return (
    <div
      className={`${sidebarStyles} ${
        openMenu ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div
        className="absolute top-5 right-4 cursor-pointer"
        onClick={handleClose}
      >
        <X className="size-7" />
      </div>
      <div className="absolute top-4 right-[62px]">
        <ModeToggle />
      </div>
      <div className="absolute top-2 left-4" onClick={handleClose}>
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
      </div>
      <div className={session ? "pt-16" : "pt-20"}>
        {session && (
          <div className="p-6 border-b border-neutral-200 dark:border-neutral-700">
            <div className="flex items-center gap-3">
              <Avatar className="size-12">
                <AvatarImage src={session.user.image!} />
                <AvatarFallback className="bg-black text-white text-lg dark:bg-neutral-800 font-medium">
                  {session.user.name?.charAt(0).toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <p className="text-sm font-medium">{session.user.name}</p>
                <p className="text-xs text-neutral-600 dark:text-neutral-400">
                  {session.user.email}
                </p>
              </div>
            </div>
          </div>
        )}
        {/* Navigation Links */}
        <nav className="p-4">
          <ul className="space-y-2">
            {navLinks.map((item) => {
              const isActive = pathname === item.link;
              return (
                <li key={item.title}>
                  <Link
                    href={item.link}
                    className={`flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400"
                        : "text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-neutral-100"
                    }`}
                  >
                    {item.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="absolute bottom-6 left-4 right-4">
          {!session ? (
            <div className="space-y-3">
              <Link
                href="/login"
                className="block w-full text-center px-4 py-2 bg-black text-white rounded-lg text-sm font-medium hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200 transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                className="block w-full text-center px-4 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg text-sm font-medium hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
              >
                Create Account
              </Link>
            </div>
          ) : (
            <SideSignout />
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
