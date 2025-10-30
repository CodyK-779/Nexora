import { X } from "lucide-react";
import { ModeToggle } from "./ModeToggle";
import Image from "next/image";
import { Skeleton } from "./ui/skeleton";

const sidebarStyles =
  "cm:hidden fixed top-0 right-0 rounded-md z-30 min-h-screen w-[350px] max-[640px]:w-full bg-white/80 dark:bg-neutral-900/70 backdrop-blur-md shadow transition-transform duration-200 ease-in translate-x-full";

const SidebarSkeleton = () => {
  return (
    <div className={sidebarStyles}>
      <div className="absolute top-5 right-4 cursor-pointer">
        <X className="size-7" />
      </div>
      <div className="absolute top-4 right-[62px]">
        <ModeToggle />
      </div>
      <div className="absolute top-2 left-4">
        <div className="flex items-center -ml-6">
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
        </div>
      </div>
      <div className="pt-20">
        <div className="p-6 border-b border-neutral-200 dark:border-neutral-700">
          <div className="flex items-center gap-3">
            <Skeleton className="size-11 rounded-full overflow-hidden" />
            <div className="flex flex-col">
              <Skeleton className="w-20 h-4" />
              <Skeleton className="w-48 h-3" />
            </div>
          </div>
        </div>
        {/* Navigation Links */}
        <nav className="p-4">
          <ul className="space-y-2">
            {[...Array(4)].map((_, i) => (
              <li key={i}>
                <div
                  className={`flex items-center px-4 py-3 rounded-lg text-sm font-medium hover:bg-neutral-100 dark:hover:bg-neutral-800`}
                >
                  <Skeleton className="h-3.5 w-14" />
                </div>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default SidebarSkeleton;
