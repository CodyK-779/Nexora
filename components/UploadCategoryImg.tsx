import { Upload } from "lucide-react";
import { Label } from "./ui/label";

interface Props {
  image: string;
  uploading: boolean;
  uploadProgress: number;
  setImage: React.Dispatch<React.SetStateAction<string>>;
  setUploading: React.Dispatch<React.SetStateAction<boolean>>;
  setUploadProgress: React.Dispatch<React.SetStateAction<number>>;
}

const UploadCategoryImg = ({
  image,
  uploading,
  uploadProgress,
  setImage,
  setUploading,
  setUploadProgress,
}: Props) => {
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

  return (
    <>
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
    </>
  );
};

export default UploadCategoryImg;
