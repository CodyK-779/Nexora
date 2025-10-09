"use client";

import { Trash2, Upload } from "lucide-react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { CldUploadWidget } from "next-cloudinary";
import { UploadedFile } from "@/app/(dashboard)/dashboard/add-product/page";
import { toast } from "sonner";

interface Props {
  imgInfo: UploadedFile[];
  uploading: boolean;
  uploadProgress: number;
  setUploadProgress: React.Dispatch<React.SetStateAction<number>>;
  setUploading: React.Dispatch<React.SetStateAction<boolean>>;
  setImgInfo: React.Dispatch<React.SetStateAction<UploadedFile[]>>;
  setImages: React.Dispatch<React.SetStateAction<string[]>>;
}

const NonCloudImg = ({
  imgInfo,
  uploading,
  uploadProgress,
  setUploading,
  setUploadProgress,
  setImgInfo,
  setImages,
}: Props) => {
  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const selectedFiles = Array.from(files).slice(0, 4);
    setUploading(true);

    try {
      const uploadPromises = selectedFiles.map(async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append(
          "upload_preset",
          `${process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}`
        );

        const res = await fetch(
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
          {
            method: "POST",
            body: formData,
          }
        );

        if (!res.ok) throw new Error("Upload failed");
        const data = await res.json();

        return {
          url: data.secure_url,
          name: `${data.original_filename}.${data.format}`,
          size: data.bytes,
        };
      });

      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      const uploadedImages = await Promise.all(uploadPromises);
      clearInterval(progressInterval);
      setUploadProgress(100);

      setImages((prev) => {
        const newImages = [...prev, ...uploadedImages.map((img) => img.url)];
        return newImages.slice(0, 4);
      });

      setImgInfo((prev) => {
        const newInfo = [...prev, ...uploadedImages];
        return newInfo.slice(0, 4);
      });

      setTimeout(() => setUploading(false), 400);
    } catch (err) {
      console.error("Cloudinary upload error:", err);
    } finally {
      setUploadProgress(0);
    }
  };

  return (
    <Card className="border-2 border-neutral-200 dark:border-neutral-700">
      <CardHeader>
        <CardTitle>Images</CardTitle>
      </CardHeader>
      <CardContent>
        <label htmlFor="image-upload" className="cursor-pointer">
          <div
            // onClick={() => {
            //   if (imgInfo.length < 4) {
            //     open();
            //   } else {
            //     toast.error("You can only upload a maximum of 4 images.");
            //     return;
            //   }
            // }}
            className="flex flex-col items-center justify-center border-2 border-dashed border-neutral-300 dark:border-neutral-700 rounded-lg p-6 text-center cursor-pointer"
          >
            <Image
              src="/dropzone.png"
              alt="Image Dropzone"
              width={400}
              height={400}
              className="max-[450px]:w-[300] h-auto object-cover max-[450px]:-mt-10 -mt-16 hidden dark:block"
            />
            <Image
              src="/dropzone-light.png"
              alt="Image Dropzone"
              width={400}
              height={400}
              className="max-[450px]:w-[300] h-auto object-cover max-[450px]:-mt-10 -mt-16 block dark:hidden"
            />
            <div className="flex max-[450px]:items-start items-center gap-2 max-[450px]:-mt-5 -mt-10">
              <Upload className="text-blue-600 dark:text-blue-500 size-5 max-[450px]:size-4" />
              <p className="text-xs sm:text-sm font-medium text-neutral-600 dark:text-neutral-300">
                Click to Upload, Up to 4 Product Images
              </p>
            </div>
          </div>
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleChange}
          />
        </label>

        {/* Image Preview */}
        {imgInfo.length > 0 && (
          <div className="mt-4 space-y-2">
            {imgInfo.map((file, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between border rounded-lg px-2.5 py-2 bg-neutral-50 dark:bg-neutral-800"
              >
                {/* Thumbnail */}
                <div className="flex items-center gap-3">
                  <img
                    src={file.url}
                    alt={file.name}
                    className="size-12 object-cover rounded-md"
                  />
                  <div>
                    {/* File name */}
                    <p className="text-sm font-medium text-neutral-800 dark:text-neutral-200 truncate max-w-[150px]">
                      {file.name}
                    </p>
                    {uploading && (
                      <div className="col-span-2 w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${uploadProgress}%` }}
                        ></div>
                      </div>
                    )}
                    {/* File size */}
                    <p className="text-xs text-neutral-500 mt-1.5">
                      {(file.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                </div>

                {/* Delete button */}
                <button
                  type="button"
                  onClick={() => {
                    setImgInfo((prev) => prev.filter((_, i) => i !== idx));
                    setImages((prev) => prev.filter((_, i) => i !== idx));
                  }}
                  className=" text-red-500 transition"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default NonCloudImg;
