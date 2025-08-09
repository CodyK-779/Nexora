"use client";

import { useMenu } from "./MenuProvider";

const MobileMenu = () => {
  const { setOpenMenu } = useMenu();

  return (
    <div className="lg:hidden cursor-pointer" onClick={() => setOpenMenu(true)}>
      <i className="ri-menu-line text-2xl font-medium"></i>
    </div>
  );
};

export default MobileMenu;
