import { getUserDetails } from "@/actions/user-action";
import CartPageHeader from "@/components/CartPageHeader";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import OrderSummary from "@/components/OrderSummary";
import { getCartItems } from "@/actions/cart-action";
import { prisma } from "@/app/lib/prisma";

export default async function CartPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const userId = (await params).id;
  const user = await getUserDetails(userId);

  if (!user) return;

  const cartItem = await getCartItems(userId);

  return (
    <>
      <CartPageHeader />
      <div className="max-container mt-10 w-full flex lg:flex-row flex-col gap-5">
        <DataTable columns={columns} data={cartItem} />
        <OrderSummary />
      </div>
    </>
  );
}
