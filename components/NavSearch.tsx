"use client";

import { Search } from "lucide-react";
import { useState } from "react";

const NavSearch = () => {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <div className="flex items-center">
      {/* Desktop search always visible focus:ring-1 focus:ring-purple-700 */}
      <div className="hidden sm:block cm:w-50 lg:w-72">
        <div className="relative">
          <input
            type="text"
            placeholder="Search Product"
            className="w-full rounded-full text-sm font-medium bg-gray-100 text-gray-600 pl-4 pr-10 py-2 focus:outline-none"
          />
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
        </div>
      </div>
    </div>
  );
};

export default NavSearch;
