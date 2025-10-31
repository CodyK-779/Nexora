import { getCartItems, getTotalCartItems } from "@/actions/cart-action";
import { getSavedAddress } from "@/actions/order-action";
import CartPageHeader from "./CartPageHeader";
import { DataTable } from "@/app/(root)/cart/[id]/data-table";
import OrderSummary from "./OrderSummary";
import { columns } from "@/app/(root)/cart/[id]/columns";

interface Props {
  params: Promise<{ id: string }>;
}

const CartContent = async ({ params }: Props) => {
  const userId = (await params).id;
  const [cartItem, addresses, totalItems] = await Promise.all([
    getCartItems(userId),
    getSavedAddress(userId),
    getTotalCartItems(userId),
  ]);

  const totalPrice = cartItem.reduce((sum, item) => {
    return sum + item.quantity * item.product.price;
  }, 0);
  const cartItemLength = cartItem.length;

  return (
    <>
      <CartPageHeader />
      <div className="max-container mt-10 w-full flex lg:flex-row items-start flex-col lg:gap-6 gap-10 pb-20">
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
};

export default CartContent;
