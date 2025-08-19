"use client";

import React, { createContext, ReactNode, useContext, useState } from "react";

interface Props {
  children: ReactNode;
}

type MenuContextType = {
  openMenu: boolean;
  setOpenMenu: React.Dispatch<React.SetStateAction<boolean>>;
};

const MenuContext = createContext<MenuContextType | undefined>(undefined);

export const useMenu = () => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error("Invalid context");
  }

  return context;
};

const MenuProvider = ({ children }: Props) => {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <MenuContext.Provider
      value={{
        openMenu,
        setOpenMenu,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};

export default MenuProvider;
