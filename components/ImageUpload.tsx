"use client";

import { Trash2, Upload } from "lucide-react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { CldUploadWidget } from "next-cloudinary";
import { UploadedFile } from "@/app/(dashboard)/dashboard/add-product/page";
import { toast } from "sonner";

interface Props {
  images: UploadedFile[];
  setImages: React.Dispatch<React.SetStateAction<UploadedFile[]>>;
}

const ImageUpload = ({ images, setImages }: Props) => {
  return (
    <Card className="border-2 border-neutral-200 dark:border-neutral-700">
      <CardHeader>
        <CardTitle>Images</CardTitle>
      </CardHeader>
      <CardContent>
        <CldUploadWidget
          uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
          options={{ maxFiles: 4 }}
          onSuccess={(result: any) => {
            setImages((prev) => {
              const newImages = [
                ...prev,
                {
                  url: result.info.secure_url,
                  name:
                    result.info.original_filename + "." + result.info.format,
                  size: result.info.bytes,
                },
              ];

              return newImages.slice(0, 4);
            });
          }}
        >
          {({ open }) => {
            return (
              <div
                onClick={() => {
                  if (images.length < 4) {
                    open();
                  } else {
                    toast.error("You can only upload a maximum of 4 images.");
                    return;
                  }
                }}
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
                    Drag & drop product images, or click to upload
                  </p>
                </div>
              </div>
            );
          }}
        </CldUploadWidget>

        {/* Image Preview */}
        {images.length > 0 && (
          <div className="mt-4 space-y-2">
            {images.map((file, idx) => (
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
                    {/* File size */}
                    <p className="text-xs text-neutral-500 mt-1.5">
                      {(file.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                </div>

                {/* Delete button */}
                <button
                  type="button"
                  onClick={() =>
                    setImages((prev) => prev.filter((_, i) => i !== idx))
                  }
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

export default ImageUpload;
