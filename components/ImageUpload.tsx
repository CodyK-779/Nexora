import { Upload, X } from "lucide-react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { useState } from "react";

interface Props {
  images: string[];
  setImages: React.Dispatch<React.SetStateAction<string[]>>;
}

const ImageUpload = ({ images, setImages }: Props) => {
  const [image, setImage] = useState("");

  return (
    <Card className="border-2 border-neutral-300 dark:border-neutral-700">
      <CardHeader>
        <CardTitle>Images</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center border-2 border-dashed border-neutral-300 dark:border-neutral-700 rounded-lg p-6 text-center cursor-pointer">
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

        <div className="mt-4 grid grid-cols-3 gap-3">
          {images.map((url, idx) => (
            <div key={idx} className="relative">
              <img
                src={url}
                alt="Uploaded"
                className="rounded-lg object-cover w-full h-32"
              />
              <button
                type="button"
                className="absolute top-1 right-1 bg-black/50 text-white p-1 rounded-full"
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ImageUpload;
