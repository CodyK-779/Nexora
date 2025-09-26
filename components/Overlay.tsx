"use client";

import { useMenu } from "./MenuProvider";

const Overlay = () => {
  const { openMenu, setOpenMenu } = useMenu();

  return (
    <>
      {openMenu && (
        <div
          onClick={() => setOpenMenu(false)}
          className="fixed cm:hidden min-h-screen inset-0 z-20 bg-black/50"
        />
      )}
    </>
  );
};

export default Overlay;
