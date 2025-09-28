"use client";

import { Upload } from "lucide-react";
import { Label } from "./ui/label";
import Image from "next/image";

interface EditFormType {
  name: string;
  image: string;
}

interface Props {
  editForm: EditFormType;
  setEditForm: React.Dispatch<React.SetStateAction<EditFormType>>;
}

const CategoryImgChange = ({ editForm, setEditForm }: Props) => {
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    setEditForm((prev) => ({ ...prev, image: previewUrl }));

    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "upload_preset",
      `${process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}`
    );

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();
      setEditForm((prev) => ({ ...prev, image: data.secure_url }));
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  return (
    <div className="flex flex-col gap-2 mt-1">
      <Label htmlFor="Image" className="text-sm">
        Category Image
      </Label>
      <div className="flex items-center justify-center">
        <div className="size-24 my-4 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 flex items-center justify-center bg-white">
          <Image
            src={editForm.image}
            alt="Category Image"
            width={100}
            height={100}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <label
        htmlFor="image-upload"
        className="flex items-center justify-center w-full cursor-pointer border-2 border-neutral-200 dark:border-neutral-700 rounded-lg px-4 py-2 text-sm font-medium hover:bg-muted transition"
      >
        <Upload className="w-4 h-4 mr-2" />
        Update Image
      </label>
      <input
        id="image-upload"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default CategoryImgChange;
