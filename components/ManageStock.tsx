"use client";

import { Loader2, PackagePlus } from "lucide-react";
import { DropdownMenuItem } from "./ui/dropdown-menu";
import { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { updateInventory } from "@/actions/product-action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface Props {
  id: string;
  inventory: number;
}

const ManageStock = ({ id, inventory }: Props) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [showEditForm, setShowEditForm] = useState(false);
  const [editForm, setEditForm] = useState({
    inventory: inventory || 0,
  });

  const handleInventory = async () => {
    setLoading(true);

    try {
      const result = await updateInventory(id, editForm.inventory);

      if (result?.success) {
        toast.success("Inventory Updated Successfully!");
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Failed to update the inventory of this product");
    } finally {
      setLoading(false);
      setShowEditForm(false);
      router.refresh();
    }
  };

  return (
    <>
      <DropdownMenuItem
        onSelect={(e) => {
          e.preventDefault();
          setShowEditForm(true);
        }}
        className="flex items-center gap-2.5 cursor-pointer"
      >
        <PackagePlus />
        Manage Stock
      </DropdownMenuItem>

      <Dialog open={showEditForm} onOpenChange={setShowEditForm}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Manage Product Inventory</DialogTitle>
            <DialogDescription className="pt-1">
              You can either increase or decrease the inventory of this product.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center py-6">
            <p className="mb-3 text-sm text-muted-foreground">
              Current Inventory
            </p>
            <div className="flex items-center gap-4">
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="rounded-full h-10 w-10"
                onClick={() =>
                  setEditForm((prev) => ({
                    ...prev,
                    inventory: Math.max(0, prev.inventory - 1),
                  }))
                }
              >
                –
              </Button>

              <span className="text-2xl font-semibold w-16 text-center">
                {editForm.inventory}
              </span>

              <Button
                type="button"
                variant="outline"
                size="icon"
                className="rounded-full h-10 w-10"
                onClick={() =>
                  setEditForm((prev) => ({
                    ...prev,
                    inventory: prev.inventory + 1,
                  }))
                }
              >
                +
              </Button>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              onClick={handleInventory}
              disabled={loading}
              className="flex items-center gap-2"
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

export default ManageStock;
