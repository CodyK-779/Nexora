"use client";

import { Loader2, Trash2 } from "lucide-react";
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
import { DropdownMenuItem } from "./ui/dropdown-menu";
import { useState } from "react";
import { deleteCategory } from "@/actions/category-action";
import { toast } from "sonner";

interface Props {
  id: string;
}

const CategoryDelete = ({ id }: Props) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);

    try {
      const results = await deleteCategory(id);

      if (results?.success) {
        toast.success("Category deleted successfully!");
      }
    } catch (error) {
      toast.error("Failed to delete category.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <DropdownMenuItem
          onSelect={(e) => e.preventDefault()}
          className="flex items-center gap-3 cursor-pointer"
        >
          <Trash2 />
          Delete
        </DropdownMenuItem>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Confirmation</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this category? This action can't be
            undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-black text-white dark:bg-white dark:text-black dark:hover:opacity-80 hover:bg-neutral-700 hover:text-white">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white transition-colors ease-in"
            disabled={loading}
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

export default CategoryDelete;
