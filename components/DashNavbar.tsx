import Image from "next/image";
import Link from "next/link";
import DashSignout from "./DashSignout";

const DashNavbar = () => {
  return (
    <div className="fixed top-0 w-full py-2 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-20">
      <div className="max-container flex items-center justify-between">
        <Link href="/" className="flex items-center lg:-ml-8 -ml-6">
          <Image src="/logo.png" alt="Logo" width={70} height={70} />
          <p className="text-[22px] font-bold -ml-3 text-gray-700">Nexora</p>
        </Link>
        <DashSignout />
      </div>
    </div>
  );
};

export default DashNavbar;
