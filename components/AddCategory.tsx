"use client";

import React, { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Loader2, Upload } from "lucide-react";
import { createCategory } from "@/actions/category-action";
import { toast } from "sonner";

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

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "upload_preset",
      `${process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}`
    );

    try {
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      clearInterval(progressInterval);
      setUploadProgress(100);

      if (!res.ok) throw new Error("Upload failed");
      const data = await res.json();

      setImage(data.secure_url);
      setTimeout(() => setUploading(false), 500);
    } catch (err) {
      console.error("Cloudinary upload error:", err);
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
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
          <div className="flex flex-col gap-2">
            <Label htmlFor="image">Category Image</Label>
            <label htmlFor="image-upload" className="cursor-pointer">
              <div className="flex items-center justify-center cursor-pointer border-2 border-neutral-200 dark:border-neutral-700 rounded-lg px-4 py-1.5 text-sm font-medium hover:bg-muted transition">
                <Upload className="w-4 h-4 mr-2" />
                {image ? "Change Image" : "Upload Image"}
              </div>
            </label>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleChange}
            />
          </div>
          {uploading && (
            <div className="col-span-2 w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
              <div
                className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
          )}

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
