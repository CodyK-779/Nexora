"use client";

import React, { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Loader2, Upload } from "lucide-react";
import { createCategory } from "@/actions/category-action";
import { toast } from "sonner";
import UploadCategoryImg from "./UploadCategoryImg";

const AddCategory = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [pending, setPending] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const resetForm = () => {
    setName("");
    setImage("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !image.trim()) {
      return toast.error("Please fill in all required fields.");
    }

    setPending(true);

    try {
      const results = await createCategory(name, image);

      if (results.success) {
        toast.success("New Category created successfully!");
        resetForm();
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
            />
          </div>

          {/* Image Upload */}
          <UploadCategoryImg
            image={image}
            uploading={uploading}
            uploadProgress={uploadProgress}
            setImage={setImage}
            setUploading={setUploading}
            setUploadProgress={setUploadProgress}
          />

          {/* Submit */}
          <div className="md:col-span-2 ">
            <Button
              type="submit"
              className="px-6 flex items-center gap-2"
              disabled={pending || uploading}
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
