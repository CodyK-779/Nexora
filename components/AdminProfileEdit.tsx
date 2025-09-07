"use client";

import { Edit, Loader2 } from "lucide-react";
import { DropdownMenuItem } from "./ui/dropdown-menu";
import { useState } from "react";
import { Payment } from "@/app/(dashboard)/dashboard/users/columns";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import UserImgChange from "./UserImgChange";
import { editUserProfile } from "@/actions/user-action";
import { toast } from "sonner";

interface Props {
  user: Payment;
}

const AdminProfileEdit = ({ user }: Props) => {
  const [loading, setLoading] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editForm, setEditForm] = useState({
    name: user.name || "",
    bio: user.bio || "",
    image: user.image || "",
  });

  const handleSubmit = async () => {
    setLoading(true);

    const formData = new FormData();
    Object.entries(editForm).forEach(([key, value]) => {
      formData.append(key, value);
    });

    const result = await editUserProfile(user.id, formData);
    if (result.success) {
      setLoading(false);
      setShowEditForm(false);
      toast.success("Profile updated successfully!");
    } else {
      toast.error("Failed to update profile");
      setLoading(false);
    }
  };

  return (
    <>
      <DropdownMenuItem
        className="flex items-center gap-3 cursor-pointer"
        onClick={(e) => {
          e.preventDefault();
          setShowEditForm(true);
        }}
      >
        <Edit />
        Edit Profile
      </DropdownMenuItem>

      <Dialog open={showEditForm} onOpenChange={setShowEditForm}>
        <DialogContent className="sm:max-w-[425px]" forceMount>
          <DialogHeader>
            <DialogTitle>Edit User Profile</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <UserImgChange editForm={editForm} setEditForm={setEditForm} />
            <div className="flex flex-col gap-2 py-3">
              <Label htmlFor="name">Name</Label>
              <Input
                name="name"
                value={editForm.name}
                onChange={(e) =>
                  setEditForm({ ...editForm, name: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col gap-2 py-3">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                value={editForm.bio}
                onChange={(e) =>
                  setEditForm({ ...editForm, bio: e.target.value })
                }
                className="min-h-[100px]"
                placeholder="Tell us about yourself"
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild className="mt-4 sm:mt-0">
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleSubmit} disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="animate-spin" />
                  <p>Updating...</p>
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

export default AdminProfileEdit;
