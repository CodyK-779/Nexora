"use client";

import { useSession } from "@/app/lib/auth-client";
import { useMenu } from "./MenuProvider";
import { Menu } from "lucide-react";
import { useState, useEffect } from "react";

const MobileMenu = () => {
  const { data: session } = useSession();
  const { setOpenMenu } = useMenu();
  const [sizeChange, setSizeChange] = useState("size-6");

  useEffect(() => {
    setSizeChange(!session ? "size-6" : "size-7");
  }, [session]);

  return (
    <div className="cm:hidden cursor-pointer" onClick={() => setOpenMenu(true)}>
      <Menu className={sizeChange} />
    </div>
  );
};

export default MobileMenu;
