"use client";

import { Camera } from "lucide-react";
import Image from "next/image";

interface EditFormType {
  name: string;
  description: string;
  categoryId: string;
  category: string;
  price: number;
  images: string[];
}

interface Props {
  uploading: boolean;
  uploadProgress: number;
  editForm: EditFormType;
  setUploadProgress: React.Dispatch<React.SetStateAction<number>>;
  setUploading: React.Dispatch<React.SetStateAction<boolean>>;
  setEditForm: React.Dispatch<React.SetStateAction<EditFormType>>;
}

const ProductImgChange = ({
  uploading,
  uploadProgress,
  editForm,
  setUploading,
  setUploadProgress,
  setEditForm,
}: Props) => {
  const handleImageChange = async (file: File, idx: number) => {
    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET as string
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

      setEditForm((prev) => {
        const updated = [...prev.images];
        updated[idx] = data.secure_url;
        return { ...prev, images: updated };
      });
      setTimeout(() => setUploading(false), 500);
    } catch (err) {
      console.error("Cloudinary upload error:", err);
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center gap-4">
        {editForm.images.map((image, idx) => (
          <div key={idx}>
            <label
              htmlFor={`image-upload-${idx}`}
              className="relative cursor-pointer"
            >
              <div className="size-20 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 flex items-center justify-center bg-neutral-900">
                <Image
                  src={image}
                  alt={`Product image ${idx + 1}`}
                  width={100}
                  height={100}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute overflow-hidden rounded-lg inset-0 flex flex-col items-center justify-center bg-black/50 opacity-0 hover:opacity-100 transition">
                <Camera className="size-5 text-white" />
                <span className="text-xs text-white">Change</span>
              </div>
            </label>
            <input
              id={`image-upload-${idx}`}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleImageChange(file, idx);
              }}
            />
          </div>
        ))}
      </div>
      {uploading && (
        <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
          <div
            className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${uploadProgress}%` }}
          ></div>
        </div>
      )}
    </>
  );
};

export default ProductImgChange;
