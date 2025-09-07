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
import { deleteUser } from "@/actions/user-action";
import { toast } from "sonner";
import { useSession } from "@/app/lib/auth-client";
import { creatorId } from "@/app/(dashboard)/dashboard/users/page";

interface Props {
  id: string;
}

const DeleteUser = ({ id }: Props) => {
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();

  if (!session) return;

  const handleDelete = async () => {
    if (id === session.user.id) {
      toast.error("You cannot delete yourself");
      return;
    }

    if (id === creatorId) {
      toast.error("You cannot delete the creator of this domain");
      return;
    }

    setLoading(true);

    try {
      const results = await deleteUser(id);

      if (results?.success) {
        toast.success("User Deleted Successfully!");
      }
    } catch (error) {
      toast.error("Failed to delete user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <DropdownMenuItem
          className="flex items-center gap-3 cursor-pointer"
          onSelect={(e) => e.preventDefault()}
        >
          <Trash2Icon />
          Delete User
        </DropdownMenuItem>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Confirmation</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this user? This action cannot be
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

export default DeleteUser;
