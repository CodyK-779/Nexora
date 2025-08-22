"use client";

import { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Loader2, Upload } from "lucide-react";
import { CldUploadWidget } from "next-cloudinary";
import { createCategory } from "@/actions/category.action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const AddCategory = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [pending, setPending] = useState(false);
  const router = useRouter();

  const resetForm = () => {
    setName("");
    setImage("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !image.trim()) return;

    setPending(true);

    try {
      const results = await createCategory(name, image);

      if (results.success) {
        toast.success("New Category created successfully!");
        resetForm();
        router.push("/dashboard/manage-categories", { scroll: false });
      } else {
        toast.error("This category already exist.");
        resetForm();
      }
    } catch (error) {
      toast.error("Failed to create new category");
      resetForm();
    } finally {
      setPending(false);
    }
  };

  return (
    <Card className="w-fit mt-6 shadow-md rounded-2xl border-2 border-neutral-200 dark:border-neutral-700">
      <CardContent className="p-6">
        <form
          className="grid gap-6 min-[500px]:grid-cols-2"
          onSubmit={handleSubmit}
        >
          {/* Name Input */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="name">Category Name</Label>
            <Input
              id="name"
              placeholder="e.g. Electronics"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border-2 border-neutral-200 dark:border-neutral-700"
              required
            />
          </div>

          {/* Image Upload */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="image">Category Image</Label>
            <CldUploadWidget
              uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
              onSuccess={(result: any) => {
                setImage(result.info.secure_url);
              }}
            >
              {({ open }) => (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => open()}
                    className="flex items-center justify-center cursor-pointer border-2 border-neutral-200 dark:border-neutral-700 rounded-lg px-4 py-2 text-sm font-medium hover:bg-muted transition"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    {image ? "Change Image" : "Upload Image"}
                  </button>
                </div>
              )}
            </CldUploadWidget>
          </div>

          {/* Image Preview */}
          {image && (
            <div className="md:col-span-2 flex justify-center">
              <img
                src={image}
                alt="Preview"
                className="h-40 w-40 object-cover rounded-xl border-2 border-neutral-200 dark:border-neutral-700"
              />
            </div>
          )}

          {/* Submit */}
          <div className="md:col-span-2 ">
            <Button
              type="submit"
              className="px-6 flex items-center gap-2"
              disabled={pending}
            >
              {pending ? (
                <>
                  <Loader2 className="animate-spin" />
                  <p>Loading...</p>
                </>
              ) : (
                <p>Add Category</p>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddCategory;
