"use client";

import DashNavbar from "@/components/DashNavbar";
import DashSidebar from "@/components/DashSidebar";
import { PropsWithChildren, useState } from "react";

const DashboardLayout = ({ children }: PropsWithChildren) => {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <>
      <DashNavbar
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
      />
      <DashSidebar
        isOpen={isOpen}
        isMobileOpen={isMobileOpen}
        setIsOpen={setIsOpen}
        setIsMobileOpen={setIsMobileOpen}
      />
      <main
        className={`${
          isOpen ? "lg:ml-[270px]" : "lg:ml-20"
        } mt-20 pb-20 transition-all duration-300`}
      >
        {children}
      </main>
    </>
  );
};

export default DashboardLayout;
