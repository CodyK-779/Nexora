import { getUserDetails } from "@/actions/user-action";
import { auth } from "@/app/lib/auth";
import OrderTable from "@/components/OrderTable";
import OrderPageHeader from "@/components/OrderPageHeader";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { cacheLife } from "next/cache";

const getData = async (userId: string) => {
  const [user, session] = await Promise.all([
    getUserDetails(userId),
    auth.api.getSession({ headers: await headers() }),
  ]);

  if (!user || !session) notFound();

  return {
    user,
    currentUser: session.user.id === userId,
    orders: user.order,
  };
};

export default async function OrderPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const userId = (await params).id;
  const data = await getData(userId);

  if (!data) return null;

  const { user, currentUser, orders } = data;

  return (
    <div className="min-h-screen pb-10">
      <OrderPageHeader currentUser={currentUser} name={user.name} />
      <OrderTable orders={orders} />
    </div>
  );
}
