"use client";

import { useSession } from "@/app/lib/auth-client";
import { useMenu } from "./MenuProvider";
import { Menu } from "lucide-react";

const MobileMenu = () => {
  const { data: session } = useSession();
  const { setOpenMenu } = useMenu();

  const sizeChange = !session ? "size-6" : "size-7";

  return (
    <div className="cm:hidden cursor-pointer" onClick={() => setOpenMenu(true)}>
      <Menu className={sizeChange} />
    </div>
  );
};

export default MobileMenu;
