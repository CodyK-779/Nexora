"use client";

import Navbar from "@/app/_components/Navbar";
import { PropsWithChildren, useState } from "react";

export default function RootLayout({ children }: PropsWithChildren) {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <div className="overflow-hidden">
      <Navbar openMenu={openMenu} setOpenMenu={setOpenMenu} />
      <main>{children}</main>
    </div>
  );
}
