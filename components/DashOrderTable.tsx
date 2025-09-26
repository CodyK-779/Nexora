import Image from "next/image";
import { DashOrderType } from "./InterfaceTypes";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { formattedPrice } from "./PopularProducts";

interface Props {
  orders: DashOrderType[];
}

const DashOrderTable = ({ orders }: Props) => {
  return (
    <section className="mt-10">
      <div className="border rounded-md overflow-x-auto">
        <Table className="min-w-[1000px]">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[450px]">Products</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <TableRow key={order.id}>
                  {/* First Cell */}
                  <TableCell className="font-medium flex items-center gap-4 max-w-[350px]">
                    <Image
                      src="/box.png"
                      alt="Order"
                      width={50}
                      height={50}
                      className="size-14 object-cover"
                    />
                    <p className="text-sm">
                      {order.orderItem.map((item) => (
                        <span key={item.id}>
                          {item.product.name} x {item.quantity},{" "}
                        </span>
                      ))}
                    </p>
                  </TableCell>
                  {/* Second Cell */}
                  <TableCell>
                    <div className="flex flex-col text-xs font-medium max-w-[150px]">
                      <p>{order.address.title}</p>
                      <p>
                        {order.address.city}, {order.address.country}
                      </p>
                      <p>
                        {order.address.state}, {order.address.postalCode}
                      </p>
                      <p>{order.address.street}</p>
                    </div>
                  </TableCell>
                  {/* Third Cell */}
                  <TableCell className="font-medium">
                    {order.user.name}
                  </TableCell>
                  {/* Fourth Cell */}
                  <TableCell className="font-medium">
                    {formattedPrice(order.total)}
                  </TableCell>
                  {/* Fifth Cell */}
                  <TableCell className="font-medium">
                    <p>
                      Date:{" "}
                      {new Date(order.createdAt).toLocaleDateString("en-GB")}
                    </p>
                    <p>Status: {order.status}</p>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </section>
  );
};

export default DashOrderTable;
