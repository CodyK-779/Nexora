import Footer from "@/components/Footer";
import MenuProvider from "@/components/MenuProvider";
import Navbar from "@/components/Navbar";
import Overlay from "@/components/Overlay";
import Sidebar from "@/components/Sidebar";
import SidebarSkeleton from "@/components/SidebarSkeleton";
import { TooltipProvider } from "@/components/ui/tooltip";
import { PropsWithChildren, Suspense } from "react";

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <div className="overflow-hidden">
      <MenuProvider>
        <Navbar />
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
