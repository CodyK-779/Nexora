import Image from "next/image";
import Link from "next/link";
import DashSignout from "./DashSignout";
import { ModeToggle } from "./ModeToggle";
import { Menu, X } from "lucide-react";

interface Props {
  isMobileOpen: boolean;
  setIsMobileOpen: (fun: boolean) => void;
}

const DashNavbar = ({ isMobileOpen, setIsMobileOpen }: Props) => {
  return (
    <div className="fixed top-0 w-full py-2 border-b bg-white dark:bg-background/95 dark:backdrop-blur dark:supports-[backdrop-filter]:bg-background/60 z-30">
      <div className="px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center lg:-ml-[30px] -ml-6">
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
          <p className="text-[22px] font-bold -ml-3 text-gray-700 dark:text-neutral-50">
            Nexora
          </p>
        </Link>
        <div className="flex items-center gap-4">
          <ModeToggle />
          <DashSignout />
          <div className="lg:hidden">
            <button onClick={() => setIsMobileOpen(!isMobileOpen)}>
              {isMobileOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashNavbar;
