"use client";

import { Edit, Loader2, Upload } from "lucide-react";
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
import { CldUploadWidget } from "next-cloudinary";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { updateCategory } from "@/actions/category-action";
import { useRouter } from "next/navigation";

interface Props {
  id: string;
}

const CategoryEdit = ({ id }: Props) => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setIsLoading] = useState(false);
  const router = useRouter();

  const openUpload = () => {
    if (window.cloudinary) {
      window.cloudinary.openUploadWidget(
        {
          cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!,
          uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!,
          sources: ["local", "url"],
          multiple: false,
        },
        (error: any, result: any) => {
          if (error) {
            console.error("Upload error:", error);
            return;
          }

          if (result.event === "success") {
            console.log("Uploaded file:", result.info.secure_url);
            setImage(result.info.secure_url);
          }
        }
      );
    } else {
      console.error("Cloudinary widget not loaded yet");
    }
  };

  const resetForm = () => {
    setName("");
    setImage("");
  };

  const handleSubmit = async () => {
    if (!name.trim() || !image.trim()) {
      toast.error("Fill all forms before submitting.");
      return;
    }
    setIsLoading(true);

    try {
      const results = await updateCategory(id, name, image);

      if (results?.success) {
        toast.success("Category updated successfully!");
        router.push("/dashboard/manage-categories", { scroll: false });
      } else {
        toast.error("You still haven't made any changes yet.");
        resetForm();
      }
    } catch (error) {
      toast.error("Failed to update category, something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Dialog modal={open} onOpenChange={setOpen}>
        <form onSubmit={handleSubmit}>
          <DialogTrigger asChild>
            <DropdownMenuItem
              className="flex items-center gap-3 cursor-pointer"
              onSelect={(e) => e.preventDefault()}
            >
              <Edit />
              Edit
            </DropdownMenuItem>
          </DialogTrigger>
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
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border-2 border-neutral-200 dark:border-neutral-700"
              />
            </div>
            <div className="flex flex-col gap-2 mt-1">
              <Label htmlFor="Image" className="text-sm">
                Category Image
              </Label>
              <button
                onClick={(e) => {
                  setOpen(false);
                  openUpload();
                }}
                className="flex items-center justify-center cursor-pointer border-2 border-neutral-200 dark:border-neutral-700 rounded-lg px-4 py-2 text-sm font-medium hover:bg-muted transition"
              >
                <Upload className="w-4 h-4 mr-2" />
                Update Image
              </button>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit" className="flex items-center gap-2">
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
        </form>
      </Dialog>
    </>
  );
};

export default CategoryEdit;
