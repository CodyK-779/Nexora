"use client";

import { Search, XIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useRef, useState } from "react";

const NavSearch = () => {
  const [search, setSearch] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const query = inputRef.current?.value.trim() || "";
    const params = new URLSearchParams(searchParams.toString());

    if (query) {
      params.set("product", query);
    } else {
      params.delete("product");
      setSearch("");
    }

    router.push(`/shop?${params.toString()}`, { scroll: false });
  };

  const clearSearch = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("product");
    router.push(pathname, { scroll: false });

    if (inputRef.current) inputRef.current.value = "";
    setSearch("");
  };

  const selectedSearch = searchParams.get("product") || "";

  return (
    <div className="flex items-center">
      <div className="hidden sm:block cm:w-50 lg:w-72">
        <form className="relative" onSubmit={handleSubmit}>
          <input
            type="text"
            ref={inputRef}
            defaultValue={selectedSearch}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Product"
            enterKeyHint="search"
            className="w-full rounded-full text-sm font-medium bg-gray-100 dark:bg-neutral-800 text-gray-600 dark:text-neutral-100 pl-4 pr-16 py-2 focus:outline-none"
          />
          <Search
            onClick={handleSubmit}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 dark:text-neutral-200 cursor-pointer"
          />
          {search && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute top-[8.8px] right-9 text-gray-500 dark:text-neutral-200"
            >
              <XIcon className="size-5" />
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default NavSearch;
