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
import { signOut } from "@/app/lib/auth-client";
import { toast } from "sonner";

const SideSignout = () => {
  const [pending, setPending] = useState(false);

  const handleSignOut = async () => {
    setPending(true);

    try {
      await signOut();
      window.location.href = "/login";
      toast.success("User Signed out successfully!");
    } catch (error) {
      toast.error("Failed to Sign out user");
    } finally {
      setPending(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          size="lg"
          className="flex items-center gap-2 w-full bg-red-600 hover:bg-red-700 text-white transition-colors ease-in"
          disabled={pending}
        >
          {pending ? (
            <>
              <Loader2 className="animate-spin" />
              Loading...
            </>
          ) : (
            <p>Sign Out</p>
          )}
        </Button>
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
            onClick={handleSignOut}
          >
            Confirm
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default SideSignout;
