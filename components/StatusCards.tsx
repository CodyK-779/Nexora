import {
  BadgeDollarSignIcon,
  ShoppingBag,
  ShoppingBasketIcon,
  Users,
} from "lucide-react";

const StatusCards = () => {
  return (
    <div className="mt-6 flex flex-wrap sm:items-center px-2 gap-4">
      {/* First Card */}
      <div className="flex flex-col items-start gap-6 w-[230px] rounded-md px-3 py-2 bg-violet-400 text-black">
        <div className="flex items-start justify-between w-full">
          <p className="text-sm font-semibold">Total Revenue</p>
          <div className="p-2 rounded-full bg-white dark:bg-black">
            <BadgeDollarSignIcon className="size-6 text-black dark:text-white" />
          </div>
        </div>
        <div className="flex flex-col">
          <h3 className="font-semibold">$ 4,674.20</h3>
          <div className="flex items-center">
            <i className="ri-arrow-right-up-line font-medium"></i>
            <p className="text-sm font-medium ml-1">+2.1%</p>
            <p className="text-sm font-semibold ml-1.5 text-neutral-700">
              This Month
            </p>
          </div>
        </div>
      </div>
      {/* Second Card */}
      <div className="flex flex-col items-start gap-6 w-[230px] rounded-md px-3 py-2 bg-neutral-900 text-white dark:bg-neutral-100 dark:text-black self-end">
        <div className="flex items-start justify-between w-full">
          <p className="text-sm font-semibold">Total Products</p>
          <div className="p-2.5 rounded-full bg-white dark:bg-black">
            <ShoppingBag className="size-5 text-black dark:text-white" />
          </div>
        </div>
        <div className="flex flex-col">
          <h3 className="font-semibold">12</h3>
          <div className="flex items-center">
            <i className="ri-arrow-right-up-line font-medium"></i>
            <p className="text-sm font-medium ml-1">+2.1%</p>
            <p className="text-sm font-semibold ml-1.5 text-neutral-200 dark:text-neutral-700">
              This Month
            </p>
          </div>
        </div>
      </div>
      {/* Third Card */}
      <div className="flex flex-col items-start gap-6 w-[230px] rounded-md px-3 py-2 bg-blue-500 text-black">
        <div className="flex items-start justify-between w-full">
          <p className="text-sm font-semibold">Total Orders</p>
          <div className="p-2.5 rounded-full bg-white dark:bg-black">
            <ShoppingBasketIcon className="size-5 text-black dark:text-white" />
          </div>
        </div>
        <div className="flex flex-col">
          <h3 className="font-semibold">100</h3>
          <div className="flex items-center">
            <i className="ri-arrow-right-down-line font-medium"></i>
            <p className="text-sm font-medium ml-1">+2.1%</p>
            <p className="text-sm font-semibold ml-1.5 text-neutral-700">
              This Month
            </p>
          </div>
        </div>
      </div>
      {/* Fourth Card */}
      <div className="flex flex-col items-start gap-6 w-[230px] rounded-md px-3 py-2 bg-neutral-900 text-white dark:bg-neutral-100 dark:text-black">
        <div className="flex items-start justify-between w-full">
          <p className="text-sm font-semibold">Total Users</p>
          <div className="p-2.5 rounded-full bg-white dark:bg-black">
            <Users className="size-5 text-black dark:text-white" />
          </div>
        </div>
        <div className="flex flex-col">
          <h3 className="font-semibold">12</h3>
          <div className="flex items-center">
            <i className="ri-arrow-right-up-line font-medium"></i>
            <p className="text-sm font-medium ml-1">+2.1%</p>
            <p className="text-sm font-semibold ml-1.5 text-neutral-200 dark:text-neutral-700">
              This Month
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusCards;

// <i className="ri-arrow-right-down-line font-medium"></i>
