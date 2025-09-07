"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Payment } from "@/app/(dashboard)/dashboard/products/columns";

interface MobileProductListProps {
  products: Payment[];
  // onEdit: (id: string) => void;
  // onDelete: (id: string) => void;
}

const MobileProductList = ({
  products,
}: // onEdit,
// onDelete,
MobileProductListProps) => {
  if (!products.length) {
    return (
      <p className="text-center text-muted-foreground mt-6">
        No products found.
      </p>
    );
  }

  return (
    <div className="space-y-4 mt-8">
      {products.map((product) => (
        <Card key={product.id} className="overflow-hidden shadow-md">
          <CardHeader className="p-0">
            <div className="relative w-full aspect-video overflow-hidden rounded-t-2xl border-b">
              <Image
                src={product.images[0]}
                alt="Product Image"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 768px, 1024px"
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          </CardHeader>
          <CardContent className="p-4 space-y-3">
            {/* Top row: name + price */}
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-base">{product.name}</h3>
              <span className="text-sm font-medium text-primary">
                ${product.price.toFixed(2)}
              </span>
            </div>

            {/* Category + Status */}
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="outline">{product.category.name}</Badge>
              <Badge
                className={
                  product.status === "Normal"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }
              >
                {product.status}
              </Badge>
            </div>

            {/* Inventory */}
            <p className="text-sm text-muted-foreground">
              Inventory: {product.inventory}
            </p>

            {/* Actions */}
            <div className="flex items-center justify-end gap-2">
              <Button
                size="sm"
                variant="outline"
                // onClick={() => onEdit(product.id)}
              >
                Edit
              </Button>
              <Button
                size="sm"
                className="bg-red-500 text-white hover:bg-red-600"
                // onClick={() => onDelete(product.id)}
              >
                Delete
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default MobileProductList;
