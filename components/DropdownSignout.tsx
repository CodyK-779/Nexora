"use client";

import { LoaderCircle, LogOut } from "lucide-react";
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
import { signOut } from "@/app/lib/auth-client";
import { toast } from "sonner";

const DropdownSignout = () => {
  const [isPending, setIsPending] = useState(false);

  const handleSignout = async () => {
    setIsPending(true);

    try {
      await signOut();
      window.location.href = "/login";
      toast.success("User Signed out successfully!");
    } catch (error) {
      toast.error("Failed to Sign out user");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <DropdownMenuItem
          className="px-4 py-2.5 cursor-pointer"
          onSelect={(e) => e.preventDefault()}
          disabled={isPending}
        >
          {isPending ? (
            <div className="flex items-center gap-3">
              <LoaderCircle className="animate-spin size-5" />
              <p className="text-sm font-medium text-neutral-600 dark:text-neutral-100">
                Loading...
              </p>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <LogOut className="size-4" />
              <p className="text-sm font-medium text-neutral-600 dark:text-neutral-100">
                Sign out
              </p>
            </div>
          )}
        </DropdownMenuItem>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Signout Confirmation</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to Sign out?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="font-medium bg-black dark:bg-white text-white dark:text-black hover:text-white hover:bg-opacity-70 transition-all duration-200 ease-in">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="text-white bg-red-600 hover:bg-red-500 transition-colors duration-200 ease-in"
            onClick={handleSignout}
          >
            Confirm
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DropdownSignout;
