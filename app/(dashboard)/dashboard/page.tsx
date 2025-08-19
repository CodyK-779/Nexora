import { auth } from "@/app/lib/auth";
import { ChartBar } from "@/components/ChartBart";
import { ChartPie } from "@/components/ChartPie";
import PopularItemList from "@/components/PopularItemList";
import StatusCards from "@/components/StatusCards";
import { headers } from "next/headers";

export default async function DashboardHome() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <section className="pt-2 px-2">
      <div className="border-b pb-4">
        <h1 className="font-bold max-[400px]:text-xl text-2xl sm:text-3xl text-gray-800 dark:text-white mb-1">
          What's up,{" "}
          <span className="text-blue-700 dark:text-blue-600">
            {session?.user.name}
          </span>
          !
        </h1>
        <p className="max-[400px]:text-sm text-base sm:text-lg font-semibold text-neutral-600 dark:text-neutral-300">
          Here's what happening with your store today.
        </p>
      </div>
      <StatusCards />
      <ChartBar />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <ChartPie />
        <PopularItemList />
      </div>
    </section>
  );
}
