"use client";

import { useState } from "react";
import { DropdownMenuItem } from "./ui/dropdown-menu";
import { Payment } from "@/app/(dashboard)/dashboard/products/columns";
import { Edit } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

interface Props {
  product: Payment;
}

const EditProduct = ({ product }: Props) => {
  const [loading, setLoading] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editForm, setEditForm] = useState({
    name: product.name || "",
    description: product.description || "",
    category: product.category.name,
    images: product.images || "",
  });

  return (
    <>
      <DropdownMenuItem
        className="flex items-center gap-2.5 cursor-pointer"
        onClick={(e) => {
          e.preventDefault();
          setShowEditForm(true);
        }}
      >
        <Edit />
        Edit Product
      </DropdownMenuItem>

      <Dialog open={showEditForm} onOpenChange={setShowEditForm}>
        <DialogContent className="sm:max-w-[450px]" forceMount>
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <div className="flex flex-col gap-2 py-3">
              <Label htmlFor="name">Product Name</Label>
              <Input
                id="name"
                value={editForm.name}
                onChange={(e) =>
                  setEditForm({ ...editForm, name: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col gap-2 py-3">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={editForm.description}
                onChange={(e) =>
                  setEditForm({ ...editForm, description: e.target.value })
                }
                className="h-32"
              />
            </div>
            <div className="flex flex-col gap-2 py-4">
              <Label htmlFor="category">Category</Label>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EditProduct;
