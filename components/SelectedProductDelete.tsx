"use client";

import { useState } from "react";
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
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { Table } from "@tanstack/react-table";
import { selectedProductsDelete } from "@/actions/product-action";
import { toast } from "sonner";

interface Props<TData> {
  selectedCount: number;
  table: Table<TData>;
}

export default function SelectedProductDelete<TData>({
  selectedCount,
  table,
}: Props<TData>) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async (ids: string[]) => {
    setLoading(true);

    try {
      const result = await selectedProductsDelete(ids);
      if (result.success) {
        toast.success("Selected Products Deleted Successfully!");
      } else {
        toast.error("Failed to delete selected products");
      }
    } catch (error) {
      toast.error("Failed to delete selected products");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          disabled={selectedCount === 0 || loading}
          className="flex items-center gap-2 font-medium bg-red-500 text-white hover:bg-red-600 transition-colors duration-200"
        >
          {selectedCount > 0 ? `Delete (${selectedCount})` : "Delete"}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Confirmation</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete these products? This action cannot
            be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-black text-white dark:bg-white dark:text-black dark:hover:opacity-80 hover:bg-neutral-700 hover:text-white">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              const selectedRows = table.getFilteredSelectedRowModel().rows;
              const ids = selectedRows.map(
                (row) => (row.original as { id: string }).id
              );
              handleDelete(ids);
            }}
            disabled={loading}
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white transition-colors ease-in"
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
}
