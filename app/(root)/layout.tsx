import Footer from "@/components/Footer";
import MenuProvider from "@/components/MenuProvider";
import Navbar from "@/components/Navbar";
import Overlay from "@/components/Overlay";
import Sidebar from "@/components/Sidebar";
import SidebarSkeleton from "@/components/skeletons/SidebarSkeleton";
import NavbarSkeleton from "@/components/skeletons/NavbarSkeleton";
import { TooltipProvider } from "@/components/ui/tooltip";
import { PropsWithChildren, Suspense } from "react";

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <div className="overflow-hidden">
      <MenuProvider>
        <Suspense fallback={<NavbarSkeleton />}>
          <Navbar />
        </Suspense>
        <Overlay />
        <Suspense fallback={<SidebarSkeleton />}>
          <Sidebar />
        </Suspense>
        <TooltipProvider>
          <main>{children}</main>
        </TooltipProvider>
      </MenuProvider>
      <Footer />
    </div>
  );
}
