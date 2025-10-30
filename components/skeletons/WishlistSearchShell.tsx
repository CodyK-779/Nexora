import { FilterIcon, SearchIcon } from "lucide-react";

const WishlistSearchShell = () => {
  return (
    <section className="w-full mt-[68px] py-14 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 text-white">
      <div className="max-w-5xl mx-auto px-2 flex flex-col justify-center gap-2">
        <h1 className="sm:text-5xl min-[425px]:text-3xl min-[350px]:text-[26px] text-xl font-semibold text-center px-2">
          Your
          <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
            wishlisted
          </span>{" "}
          items
        </h1>
        <form className="relative max-w-3xl mx-auto sm:mt-4 mt-2 w-full px-2 sm:px-0">
          <input
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
        </form>
        <p className="text-xs text-neutral-200 font-medium text-center mt-3">
          Clear the input field to cancel the filtering
        </p>
      </div>
    </section>
  );
};

export default WishlistSearchShell;
