"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { Table } from "@tanstack/react-table";
import { useSession } from "@/app/lib/auth-client";
import { toast } from "sonner";
import { selectedUserDelete } from "@/actions/user-action";
import { creatorId } from "@/app/(dashboard)/dashboard/users/page";
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

interface Props<TData> {
  selectedCount: number;
  table: Table<TData>;
}

export default function SelectedDelete<TData>({
  selectedCount,
  table,
}: Props<TData>) {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);

  if (!session) return;

  const handleDelete = async (ids: string[]) => {
    if (ids.includes(session.user.id)) {
      toast.error("You cannot delete yourself.");
      return;
    }

    if (creatorId && ids.includes(creatorId)) {
      toast.error("You cannot delete the creator of this domain");
      return;
    }

    setLoading(true);

    const result = await selectedUserDelete(ids);

    if (result.success) {
      toast.success("Selected Users Deleted Successfully!");
    } else {
      toast.success("Failed to delete selected users, something went wrong.");
    }

    setLoading(false);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          className="flex items-center gap-2 font-medium bg-red-500 text-white hover:bg-red-600 transition-colors duration-200"
          disabled={selectedCount === 0 || loading}
        >
          {selectedCount > 0 ? `Delete (${selectedCount})` : "Delete"}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Confirmation</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete these users? This action cannot be
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
            onClick={() => {
              const selectedRows = table.getFilteredSelectedRowModel().rows;
              const ids = selectedRows.map(
                (row) => (row.original as { id: string }).id
              );
              handleDelete(ids);
            }}
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
