"use client";

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

const DashSignout = () => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="font-semibold">Log out</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Signout Confirmation</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to Sign out?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-black text-white hover:text-white hover:bg-opacity-70 transition-all duration-200 ease-in">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction className="bg-red-600 hover:bg-red-500 transition-colors duration-200 ease-in">
            Confirm
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DashSignout;
