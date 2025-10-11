"use client";

import { Edit, Loader2 } from "lucide-react";
import { DropdownMenuItem } from "./ui/dropdown-menu";
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
import { useState } from "react";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { updateCategory } from "@/actions/category-action";
import CategoryImgChange from "./CategoryImgChange";

interface Props {
  id: string;
  name: string;
  image: string;
}

const CategoryEdit = ({ id, name, image }: Props) => {
  const [open, setOpen] = useState(false);
  const [loading, setIsLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [editForm, setEditForm] = useState({
    name,
    image,
  });

  const handleSubmit = async () => {
    setIsLoading(true);

    const formData = new FormData();
    Object.entries(editForm).forEach(([key, value]) => {
      formData.append(key, value);
    });

    try {
      const result = await updateCategory(id, formData);

      if (result.success) {
        toast.success("Category updated successfully!");
      } else {
        toast.error("Something went wrong, failed to update category");
      }
    } catch (error) {
      console.error("Something went wrong, failed to update category");
    } finally {
      setIsLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <DropdownMenuItem
        className="flex items-center gap-3 cursor-pointer"
        onClick={(e) => {
          e.preventDefault();
          setOpen(true);
        }}
      >
        <Edit />
        Edit
      </DropdownMenuItem>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="mb-1.5">Edit Category</DialogTitle>
            <DialogDescription>
              Make changes to your category here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-2">
            <Label htmlFor="name" className="text-sm ">
              Category Name
            </Label>
            <Input
              id="name"
              placeholder="e.g. Electronics"
              value={editForm.name}
              onChange={(e) =>
                setEditForm({ ...editForm, name: e.target.value })
              }
              className="border-2 border-neutral-200 dark:border-neutral-700"
            />
          </div>
          <CategoryImgChange
            uploadProgress={uploadProgress}
            uploading={uploading}
            editForm={editForm}
            setUploading={setUploading}
            setUploadProgress={setUploadProgress}
            setEditForm={setEditForm}
          />
          <DialogFooter>
            <DialogClose asChild className="sm:mt-0 mt-2.5">
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              disabled={loading || uploading}
              className="flex items-center gap-2"
              onClick={handleSubmit}
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" />
                  Loading...
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

export default CategoryEdit;
