"use client";

import { OpenMenu } from "./Navbar";

const MobileMenu = ({ openMenu, setOpenMenu }: OpenMenu) => {
  return (
    <div className="lg:hidden cursor-pointer">
      <i className="ri-menu-line text-2xl font-medium"></i>
    </div>
  );
};

export default MobileMenu;
