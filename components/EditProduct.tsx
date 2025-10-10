"use client";

import { useState } from "react";
import { DropdownMenuItem } from "./ui/dropdown-menu";
import { Payment } from "@/app/(dashboard)/dashboard/products/columns";
import { Edit, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Category } from "@/app/generated/prisma";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";
import ProductImgChange from "./ProductImgChange";
import { updateProduct } from "@/actions/product-action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface Props {
  product: Payment;
  categories: Category[];
}

const EditProduct = ({ product, categories }: Props) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [showEditForm, setShowEditForm] = useState(false);
  const [editForm, setEditForm] = useState({
    name: product.name || "",
    description: product.description || "",
    categoryId: product.categoryId || "",
    category: product.category.name || "",
    price: product.price || 0,
    images: product.images || [],
  });

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const formData = new FormData();
      Object.entries(editForm).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((v) => formData.append("images", v));
        } else if (value !== undefined && value !== null) {
          formData.append(key, String(value));
        }
      });

      const result = await updateProduct(product.id, formData);

      if (result.success) {
        toast.success("Product Details Updated Successfully!");

        router.refresh();
        router.replace(`/dashboard/products?t=${Date.now()}`);
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Failed to update product");
    } finally {
      setLoading(false);
      setShowEditForm(false);
    }
  };

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
        <DialogContent
          className="sm:max-w-[450px]"
          aria-describedby={undefined}
        >
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
            <div className="flex items-center gap-3 py-4">
              <div className="flex flex-col gap-2.5 w-full">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={editForm.categoryId}
                  onValueChange={(value: string) =>
                    setEditForm({ ...editForm, categoryId: value })
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Categories</SelectLabel>
                      {categories.map((cat) => (
                        <SelectItem
                          key={cat.id}
                          value={cat.id}
                          disabled={editForm.category === cat.name}
                        >
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-2.5 w-full">
                <Label htmlFor="price">Price</Label>
                <Input
                  type="number"
                  value={editForm.price}
                  className="w-full"
                  onChange={(e) => {
                    const value = e.target.value;
                    setEditForm({
                      ...editForm,
                      price: value === "" ? 0 : parseFloat(value),
                    });
                  }}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2.5 py-4">
              <Label>Product Images</Label>
              <ProductImgChange editForm={editForm} setEditForm={setEditForm} />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              onClick={handleSubmit}
              disabled={loading}
              className="flex items-center gap-2 mb-4 sm:mb-0"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" />
                  Updating...
                </>
              ) : (
                <p>Confirm</p>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EditProduct;
