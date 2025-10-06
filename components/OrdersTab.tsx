import { ShoppingBag } from "lucide-react";
import { Badge } from "./ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "./ui/card";
import { TabsContent } from "./ui/tabs";
import { OrdersType } from "./InterfaceTypes";
import { formattedPrice } from "./PopularProducts";

interface Props {
  orders: OrdersType[];
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "Delivered":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
    case "Shipped":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
    case "PENDING":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
  }
};

const OrdersTab = ({ orders }: Props) => {
  return (
    <TabsContent value="orders" className="space-y-6">
      <Card className="border-0 shadow-lg dark:bg-gray-900">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            Order History
          </CardTitle>
          <CardDescription>View and manage your recent orders</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {orders.length > 0 ? (
              <>
                {orders.map((order, index) => (
                  <div
                    key={order.id}
                    className="flex flex-col min-[450px]:flex-row justify-between items-start min-[450px]:items-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-3">
                        <p className="font-semibold text-gray-900 dark:text-white">
                          Order - {index + 1}
                        </p>
                        <Badge
                          textSize="text-[10px]"
                          className={getStatusColor(order.status)}
                        >
                          {order.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {order.orderItem.length}{" "}
                        {order.orderItem.length > 1 ? "items" : "item"} •{" "}
                        {new Date(order.createdAt).toLocaleDateString("en-GB")}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Tracking: {order.id.slice(0, 13)}
                      </p>
                    </div>
                    <p className="sm:text-lg text-base font-bold text-gray-900 dark:text-white min-[450px]:mt-0 mt-3">
                      {formattedPrice(order.total)}
                    </p>
                  </div>
                ))}
              </>
            ) : (
              <div className="text-center py-12">
                <ShoppingBag className="min-[350px]:size-16 size-14 text-gray-300 mx-auto mb-4" />
                <h3 className="min-[350px]:text-lg text-base font-semibold text-gray-900 dark:text-white mb-2">
                  Your Order is empty
                </h3>
              </div>
            )}
            {/* {orders.map((order, index) => (
              <div
                key={order.id}
                className="flex flex-col min-[450px]:flex-row justify-between items-start min-[450px]:items-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <p className="font-semibold text-gray-900 dark:text-white">
                      Order - {index + 1}
                    </p>
                    <Badge className={getStatusColor(order.status)}>
                      {order.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {order.orderItem.length}{" "}
                    {order.orderItem.length > 1 ? "items" : "item"} •{" "}
                    {new Date(order.createdAt).toLocaleDateString("en-GB")}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Tracking: {order.id.slice(0, 13)}
                  </p>
                </div>
                <p className="sm:text-lg text-base font-bold text-gray-900 dark:text-white min-[450px]:mt-0 mt-3">
                  {formattedPrice(order.total)}
                </p>
              </div>
            ))} */}
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default OrdersTab;
