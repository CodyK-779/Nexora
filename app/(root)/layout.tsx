import MenuProvider from "@/components/MenuProvider";
import Navbar from "@/components/Navbar";
import { PropsWithChildren } from "react";

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <div className="overflow-hidden">
      <MenuProvider>
        <Navbar />
        <main>{children}</main>
      </MenuProvider>
    </div>
  );
}
