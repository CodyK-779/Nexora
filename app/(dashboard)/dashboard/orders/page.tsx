import { getAllOrders } from "@/actions/order-action";
import DashOrderTable from "@/components/DashOrderTable";

export default async function DashboardOrdersPage() {
  const orders = await getAllOrders();

  return (
    <section className="pt-2 px-2">
      <h1 className="text-3xl font-semibold">
        All <span className="text-blue-700 dark:text-blue-600">Orders</span>
      </h1>
      <DashOrderTable orders={orders} />
    </section>
  );
}
