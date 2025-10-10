"use client";

import { User, X } from "lucide-react";
import { useMenu } from "./MenuProvider";
import { ModeToggle } from "./ModeToggle";
import Link from "next/link";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useSession } from "@/app/lib/auth-client";
import { usePathname } from "next/navigation";
import SideSignout from "./SideSignout";
import { Button } from "./ui/button";

export const navLinks = [
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
              <div className="relative size-11 rounded-full overflow-hidden">
                {session.user.image ? (
                  <Image
                    src={session.user.image}
                    alt={session.user.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="size-11 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 flex items-center justify-center">
                    <User className="size-6 text-blue-600 dark:text-blue-400" />
                  </div>
                )}
              </div>
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
                <li key={item.title} onClick={handleClose}>
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
              <Button asChild className="w-full" size="lg">
                <Link href="/login">Sign In</Link>
              </Button>
              <Button
                asChild
                className="w-full bg-white dark:bg-black dark:border border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-900 text-black dark:text-white transition-colors ease-in"
                size="lg"
              >
                <Link href="/register">Create Account</Link>
              </Button>
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
