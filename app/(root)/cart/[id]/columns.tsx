"use client";

import { Status } from "@/app/generated/prisma";
import CartQuantity from "@/components/CartQuantity";
import DeleteCartItem from "@/components/DeleteCartItem";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import Image from "next/image";

export type CartItem = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  cardId: string;
  productId: string;
  quantity: number;
  product: {
    id: string;
    status: Status;
    name: string;
    description: string;
    images: string[];
    price: number;
    inventory: number;
    categoryId: string;
    createdAt: Date;
    updatedAt: Date;
  };
};

export const columns: ColumnDef<CartItem>[] = [
  {
    accessorFn: (row) => row.product.name,
    id: "productName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Product
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const item = row.original;
      return (
        <div className="flex items-center gap-3 ml-2">
          <div className="size-10 rounded-md overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm bg-white">
            <Image
              src={item.product.images[0]}
              alt="Product image"
              width={100}
              height={100}
              className="w-full h-full object-cover"
            />
          </div>
          <span className="whitespace-nowrap font-medium">
            {item.product.name}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const item = row.original;
      const price = String(item.product.price);
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(parseFloat(price));

      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
    cell: ({ row }) => {
      const item = row.original;
      return (
        <CartQuantity
          cartItemId={item.id}
          quantity={item.quantity}
          inventory={item.product.inventory}
        />
      );
    },
  },
  {
    accessorKey: "subTotal",
    header: "Subtotal",
    cell: ({ row }) => {
      const item = row.original;
      const subTotal = String(item.product.price * item.quantity);
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(parseFloat(subTotal));

      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "remove",
    header: "Remove",
    cell: ({ row }) => {
      const item = row.original;

      return <DeleteCartItem cartItemId={item.id} />;
    },
  },
];
