import { Camera, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Image from "next/image";

interface EditFormType {
  name: string;
  bio: string;
  image: string;
}

interface Props {
  uploading: boolean;
  uploadProgress: number;
  setUploadProgress: React.Dispatch<React.SetStateAction<number>>;
  setUploading: (uploading: boolean) => void;
  editForm: EditFormType;
  setEditForm: React.Dispatch<React.SetStateAction<EditFormType>>;
}

const UserImgChange = ({
  uploading,
  uploadProgress,
  setUploadProgress,
  setUploading,
  editForm,
  setEditForm,
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

      setEditForm((prev) => ({ ...prev, image: data.secure_url }));
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
      <div className="flex items-center justify-center">
        <label
          htmlFor="image-upload"
          className="relative size-24 rounded-full overflow-hidden cursor-pointer flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900"
        >
          {editForm.image ? (
            <Image
              src={editForm.image}
              alt="User Profile"
              fill
              className="object-cover"
            />
          ) : (
            <div className="absolute flex items-center justify-center">
              <User className="h-12 w-12 text-blue-600 dark:text-blue-400" />
            </div>
          )}
          <div className="absolute inset-0 flex flex-col items-center justify-center rounded-full bg-black/50 opacity-0 hover:opacity-100 transition">
            <Camera className="size-5" />
            <span className="text-xs text-white">Change</span>
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
      <p className="text-center font-medium mt-2 pb-4">{editForm.name}</p>
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

export default UserImgChange;

/*



*/
