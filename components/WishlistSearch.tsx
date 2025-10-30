"use client";

import { User } from "@/app/generated/prisma";
import { useSession } from "@/app/lib/auth-client";
import { FilterIcon, SearchIcon, XIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useEffect, useRef, useState } from "react";

interface Props {
  userId: string;
  user: User;
}

const WishlistSearch = ({ userId, user }: Props) => {
  const { data: session } = useSession();
  const [search, setSearch] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [isClient, setIsClient] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient || !session) {
    return (
      <section className="w-full mt-[68px] py-14 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 text-white">
        <div className="max-w-5xl mx-auto px-2 flex flex-col justify-center gap-2">
          <div className="h-12 bg-blue-500/50 rounded-full max-w-3xl mx-auto w-full animate-pulse" />
        </div>
      </section>
    );
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const query = inputRef.current?.value.trim() || "";
    const params = new URLSearchParams(searchParams.toString());

    if (query) {
      params.set("search", query);
    } else {
      params.delete("search");
      setSearch("");
    }

    router.push(`/wishlist/${userId}?${params.toString()}`, { scroll: false });
  };

  const clearSearch = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("search");
    router.push(`/wishlist/${userId}?${params.toString()}`, { scroll: false });

    if (inputRef.current) inputRef.current.value = "";
    setSearch("");
  };

  const currentUser = session && session.user.id === userId;
  const selectedSearch = searchParams.get("search") || "";

  return (
    <section className="w-full mt-[68px] py-14 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 text-white">
      <div className="max-w-5xl mx-auto px-2 flex flex-col justify-center gap-2">
        <h1 className="sm:text-5xl min-[425px]:text-3xl min-[350px]:text-[26px] text-xl font-semibold text-center px-2">
          <span>{currentUser ? "Your" : user.name.split(" ")[0] + "'s"}</span>{" "}
          <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
            wishlisted
          </span>{" "}
          items
        </h1>
        <form
          onSubmit={handleSubmit}
          className="relative max-w-3xl mx-auto sm:mt-4 mt-2 w-full px-2 sm:px-0"
        >
          <input
            ref={inputRef}
            defaultValue={selectedSearch}
            onChange={(e) => setSearch(e.target.value)}
            enterKeyHint="search"
            placeholder="Search by product name"
            className="w-full flex items-center sm:text-base text-sm justify-center shadow rounded-full sm:py-3 min-[350px]:py-2.5 py-2 sm:px-12 px-10 focus:outline-none"
          />
          <div className="absolute sm:top-3.5 min-[350px]:top-3 top-2.5 left-6 sm:left-4">
            <SearchIcon className="sm:size-5 size-4 text-gray-500 dark:text-neutral-200" />
          </div>
          <div className="absolute sm:top-3.5 min-[350px]:top-3 top-2.5 right-7 sm:right-5">
            <FilterIcon className="sm:size-5 size-4 text-gray-500 dark:text-neutral-200" />
          </div>
          {search && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute sm:top-3.5 top-[9px] right-12 text-gray-500 dark:text-neutral-200"
            >
              <XIcon className="max-[350px]:size-5" />
            </button>
          )}
        </form>
        <p className="text-xs text-neutral-200 font-medium text-center mt-3">
          Clear the input field to cancel the filtering
        </p>
      </div>
    </section>
  );
};

export default WishlistSearch;
