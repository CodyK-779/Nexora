"use client";

import { Status } from "@/app/generated/prisma";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import EditProduct from "@/components/EditProduct";
import ChangeProductStatus from "@/components/ChangeProductStatus";
import DeleteProduct from "@/components/DeleteProduct";
import ManageStock from "@/components/ManageStock";
import Link from "next/link";

interface Category {
  id: string;
  name: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
}

export type Payment = {
  id: string;
  name: string;
  description: string;
  images: string[];
  status: Status;
  price: number;
  inventory: number;
  createdAt: Date;
  categoryId: string;
  category: {
    name: string;
  };
};

export function getColumns(categories: Category[]): ColumnDef<Payment>[] {
  return [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Product Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const product = row.original;
        return (
          <div className="flex items-center gap-3 ml-2">
            <div className="size-10 rounded-md overflow-hidden border border-neutral-300 dark:border-gray-700 shadow bg-white">
              <Image
                src={product.images[0]}
                alt="Product image"
                width={100}
                height={100}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="whitespace-nowrap font-medium">
              {product.name.slice(0, 30)}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => {
        const categoryName = row.original.category.name;
        return <p>{categoryName}</p>;
      },
    },
    {
      accessorKey: "status",
      header: "Status",
    },
    {
      accessorKey: "price",
      header: () => <div>Price</div>,
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("price"));
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(amount);

        return <div className="font-medium">{formatted}</div>;
      },
    },
    {
      accessorKey: "inventory",
      header: "Inventory",
    },
    {
      accessorKey: "createdAt",
      header: "Published At",
      cell: ({ row }) => {
        const date = new Date(row.original.createdAt);
        return (
          <div className="whitespace-nowrap">
            {date.toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </div>
        );
      },
    },
    {
      accessorKey: "actions",
      header: "Actions",
      id: "actions",
      cell: ({ row }) => {
        const product = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <EditProduct product={product} categories={categories} />
              <ManageStock id={product.id} inventory={product.inventory} />
              <ChangeProductStatus id={product.id} status={product.status} />
              <DeleteProduct id={product.id} />
              <DropdownMenuSeparator />
              <Link href={`/product/${product.id}`}>
                <DropdownMenuItem className="cursor-pointer">
                  View Product Details
                </DropdownMenuItem>
              </Link>
              <DropdownMenuItem>View payment details</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
}
