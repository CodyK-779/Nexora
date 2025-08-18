import MenuProvider from "@/components/MenuProvider";
import Navbar from "@/components/Navbar";
import { PropsWithChildren } from "react";

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <div className="overflow-hidden">
      <MenuProvider>
        <Navbar />
        <main className="pb-20">{children}</main>
      </MenuProvider>
    </div>
  );
}
