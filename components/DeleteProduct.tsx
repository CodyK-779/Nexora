"use client";

import { Loader2, Trash2Icon } from "lucide-react";
import { DropdownMenuItem } from "./ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { useState } from "react";
import { deleteProduct } from "@/actions/product-action";
import { toast } from "sonner";

interface Props {
  id: string;
}

const DeleteProduct = ({ id }: Props) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);

    try {
      const result = await deleteProduct(id);

      if (result?.success) {
        toast.success("Product Deleted Successfully!");
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Failed to delete this product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <DropdownMenuItem
          className="flex items-center gap-2.5 cursor-pointer"
          onSelect={(e) => e.preventDefault()}
        >
          <Trash2Icon />
          Delete Product
        </DropdownMenuItem>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Confirmation</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this product? This action cannot be
            undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-black text-white dark:bg-white dark:text-black dark:hover:opacity-80 hover:bg-neutral-700 hover:text-white">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white transition-colors ease-in"
            onClick={handleDelete}
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" />
                Deleting...
              </>
            ) : (
              <p>Confirm</p>
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteProduct;
