import Footer from "@/components/Footer";
import MenuProvider from "@/components/MenuProvider";
import Navbar from "@/components/Navbar";
import Overlay from "@/components/Overlay";
import Sidebar from "@/components/Sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { PropsWithChildren } from "react";

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <div className="overflow-hidden">
      <MenuProvider>
        <Navbar />
        <Overlay />
        <Sidebar />
        <TooltipProvider>
          <main className="pb-10">{children}</main>
        </TooltipProvider>
      </MenuProvider>
      <Footer />
    </div>
  );
}
