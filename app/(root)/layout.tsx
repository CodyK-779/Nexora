import MenuProvider from "@/components/MenuProvider";
import Navbar from "@/components/Navbar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { PropsWithChildren } from "react";

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <div className="overflow-hidden">
      <MenuProvider>
        <Navbar />
        <TooltipProvider>
          <main className="pb-20">{children}</main>
        </TooltipProvider>
      </MenuProvider>
    </div>
  );
}
