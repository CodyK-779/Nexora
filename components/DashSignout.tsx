"use client";

import { signOut } from "@/app/lib/auth-client";
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
import { useState } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface Props {
  width?: boolean;
}

const DashSignout = ({ width }: Props) => {
  const [loading, setLoading] = useState(false);

  const handleSignout = async () => {
    setLoading(true);

    try {
      await signOut();
      window.location.href = "/login";
      toast.success("User Signed out successfully!");
    } catch (error) {
      toast.error("Failed to Sign out user.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          className={`font-semibold flex items-center gap-2 ${
            width && "w-full"
          }`}
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin" />
              Loading...
            </>
          ) : (
            <p>Log out</p>
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
            onClick={handleSignout}
            className="text-white bg-red-600 hover:bg-red-500 transition-colors duration-200 ease-in"
          >
            Confirm
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DashSignout;
