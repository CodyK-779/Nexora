import { getUserDetails } from "@/actions/user-action";
import { auth } from "@/app/lib/auth";
import OrderTable from "@/components/OrderTable";
import OrderPageHeader from "@/components/OrderPageHeader";
import { headers } from "next/headers";

export default async function OrderPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const userId = (await params).id;
  const user = await getUserDetails(userId);
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) return;
  if (!user) return;

  const currentUser = session.user.id === userId;
  const orders = user.order;

  return (
    <div className="min-h-screen">
      <OrderPageHeader currentUser={currentUser} name={user.name} />
      <OrderTable orders={orders} />
    </div>
  );
}
