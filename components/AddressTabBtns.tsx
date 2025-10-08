"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Address } from "@/app/generated/prisma";
import { Loader2 } from "lucide-react";
import { useSession } from "@/app/lib/auth-client";
import { toast } from "sonner";
import { setDefaultAddress, updateAddress } from "@/actions/order-action";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

interface Props {
  userId: string;
  address: Address;
}

const AddressTabBtns = ({ userId, address }: Props) => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editForm, setEditForm] = useState({
    title: address.title || "",
    street: address.street || "",
    city: address.city || "",
    state: address.state || "",
    postalCode: address.postalCode || "",
    country: address.country || "",
  });

  const handleDefault = async () => {
    if (session?.user.id !== userId) {
      return toast.error(
        "Address management is restricted to account owners only."
      );
    }

    setLoading(true);

    try {
      const result = await setDefaultAddress(
        userId,
        address.id,
        `/profile/${userId}`
      );

      if (result.error) {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.error("Something went wrong, failed to set address as default");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    setUpdating(true);

    try {
      const formData = new FormData();
      Object.entries(editForm).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const result = await updateAddress(
        address.id,
        formData,
        `/profile/${userId}`
      );

      if (result.success) {
        toast.success("Address updated successfully!");
      } else {
        toast.success("Failed to update address, something went wrong.");
      }
    } catch (error) {
      console.error("Failed to update address:", error);
    } finally {
      setUpdating(false);
      setShowEditForm(false);
    }
  };

  const currentUser = () => {
    if (session?.user.id !== userId) {
      return toast.error(
        "Address management is restricted to account owners only."
      );
    }

    setShowEditForm(true);
  };

  return (
    <div className="flex gap-2 mt-4">
      <Button variant="outline" size="sm" onClick={currentUser}>
        Edit
      </Button>

      <Dialog open={showEditForm} onOpenChange={setShowEditForm}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Address</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            {/* Title */}
            <div className="flex flex-col gap-3">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={editForm.title}
                onChange={(e) =>
                  setEditForm({ ...editForm, title: e.target.value })
                }
              />
            </div>
            <div className="flex items-center gap-3">
              {/* State */}
              <div className="flex flex-col gap-3 w-full">
                <Label htmlFor="state">State</Label>
                <Input
                  id="state"
                  value={editForm.state}
                  onChange={(e) =>
                    setEditForm({ ...editForm, state: e.target.value })
                  }
                />
              </div>
              {/* Country */}
              <div className="flex flex-col gap-3 w-full">
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  value={editForm.country}
                  onChange={(e) =>
                    setEditForm({ ...editForm, country: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="flex items-center gap-3">
              {/* City */}
              <div className="flex flex-col gap-3 w-full">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  value={editForm.city}
                  onChange={(e) =>
                    setEditForm({ ...editForm, city: e.target.value })
                  }
                />
              </div>
              {/* PostalCode */}
              <div className="flex flex-col gap-3 w-full">
                <Label htmlFor="postalCode">Postal Code</Label>
                <Input
                  id="postalCode"
                  value={editForm.postalCode}
                  onChange={(e) =>
                    setEditForm({ ...editForm, postalCode: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="street">Street</Label>
              <Textarea
                id="street"
                value={editForm.street}
                onChange={(e) =>
                  setEditForm({ ...editForm, street: e.target.value })
                }
                className="h-28"
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              disabled={updating}
              onClick={handleSubmit}
              className="flex items-center gap-2"
            >
              {updating ? (
                <>
                  <Loader2 className="animate-spin" />
                  Updating...
                </>
              ) : (
                <p>Save Changes</p>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {!address.isDefault && (
        <Button
          variant="outline"
          size="sm"
          disabled={loading}
          onClick={handleDefault}
          className="flex items-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin" />
              Loading...
            </>
          ) : (
            <p>Set as Default</p>
          )}
        </Button>
      )}
    </div>
  );
};

export default AddressTabBtns;
