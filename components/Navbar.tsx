import Image from "next/image";
import Link from "next/link";
import NavButtons from "./NavButtons";
import NavLinks from "./NavLinks";
import { Suspense } from "react";
import NavSkeleton from "./skeletons/NavSkeleton";
import NavLinksSkeleton from "./skeletons/NavLinksSkeleton";

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
            <p className="min-[400px]:text-[22px] text-[20px] font-bold min-[340px]:-ml-3 -ml-3.5 text-black dark:text-neutral-50">
              Nexora
            </p>
          </Link>
          {/* Second Row */}
          <Suspense fallback={<NavLinksSkeleton />}>
            <NavLinks />
          </Suspense>
        </div>
        {/* Third Row */}
        <Suspense fallback={<NavSkeleton />}>
          <NavButtons />
        </Suspense>
      </div>
    </div>
  );
};

export default Navbar;
