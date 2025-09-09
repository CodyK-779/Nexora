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
  editForm: EditFormType;
  setEditForm: React.Dispatch<React.SetStateAction<EditFormType>>;
}

const ProductImgChange = ({ editForm, setEditForm }: Props) => {
  return (
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
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (!file) return;

              // Preview first
              const previewUrl = URL.createObjectURL(file);
              setEditForm((prev) => {
                const updatedImages = [...prev.images];
                updatedImages[idx] = previewUrl;
                return { ...prev, images: updatedImages };
              });

              const formData = new FormData();
              formData.append("file", file);
              formData.append(
                "upload_preset",
                process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET as string
              );

              try {
                const res = await fetch(
                  `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
                  {
                    method: "POST",
                    body: formData,
                  }
                );

                if (!res.ok) throw new Error("Upload failed");
                const data = await res.json();
                setEditForm((prev) => ({
                  ...prev,
                  images: prev.images.map((img, i) =>
                    i === idx ? data.secure_url : img
                  ),
                }));
              } catch (err) {
                console.error("Cloudinary upload error:", err);
              }
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default ProductImgChange;
