import { getUserDetails } from "@/actions/user-action";
import CartPageHeader from "@/components/CartPageHeader";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import OrderSummary from "@/components/OrderSummary";
import { getCartItems, getTotalCartItems } from "@/actions/cart-action";
import { getSavedAddress } from "@/actions/order-action";

export default async function CartPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const userId = (await params).id;
  const user = await getUserDetails(userId);

  if (!user) return;

  const cartItem = await getCartItems(userId);
  const addresses = await getSavedAddress(userId);
  const totalItems = await getTotalCartItems(userId);
  const totalPrice = cartItem.reduce((sum, item) => {
    return sum + item.quantity * item.product.price;
  }, 0);
  const cartItemLength = cartItem.length;

  return (
    <>
      <CartPageHeader />
      <div className="max-container mt-10 w-full flex lg:flex-row items-start flex-col lg:gap-6 gap-10">
        <DataTable columns={columns} data={cartItem} />
        <OrderSummary
          addresses={addresses}
          totalItems={totalItems}
          totalPrice={totalPrice}
          itemLength={cartItemLength}
        />
      </div>
    </>
  );
}
