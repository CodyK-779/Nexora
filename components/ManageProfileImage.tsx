"use client";

import { useState } from "react";
import { UserDetailsType } from "./InterfaceTypes";
import Image from "next/image";
import { Camera, Loader2, User } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { useSession } from "@/app/lib/auth-client";
import { toast } from "sonner";
import { updateProfileImage } from "@/actions/user-action";

interface Props {
  user: UserDetailsType;
}

const ManageProfileImage = ({ user }: Props) => {
  const { data: session } = useSession();
  const [image, setImage] = useState(user.image);
  const [showEdit, setShowEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
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

      const data = await res.json();
      setImage(data.secure_url);

      setTimeout(() => setUploading(false), 500);
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const handleUpdate = async () => {
    if (!image) {
      return toast.error("Image is empty");
    }

    setLoading(true);

    try {
      const result = await updateProfileImage(
        user.id,
        image,
        `/profile/${user.id}`
      );

      if (result.success) {
        toast.success("Profile image updated successfully!");
      } else {
        toast.error("Failed to update profile image, something went wrong");
      }
    } catch (error) {
      console.error("Failed to update profile image", error);
    } finally {
      setLoading(false);
      setShowEdit(false);
    }
  };

  return (
    <div className="relative min-[450px]:size-24 size-20 inline-block mb-4">
      {user.image ? (
        <Image
          src={user.image}
          alt={user.name}
          fill
          className="object-cover rounded-full"
        />
      ) : (
        <div className="min-[450px]:size-24 size-20 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 flex items-center justify-center">
          <User className="h-12 w-12 text-blue-600 dark:text-blue-400" />
        </div>
      )}
      {session?.user.id === user.id && (
        <Button
          size="icon"
          onClick={() => setShowEdit(true)}
          className="absolute bottom-0 right-0 min-[450px]:size-8 size-6 rounded-full"
        >
          <Camera className="min-[450px]:size-4 size-3" />
        </Button>
      )}

      <Dialog open={showEdit} onOpenChange={setShowEdit}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Profile Image</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center my-6">
            <label
              htmlFor="image-upload"
              className="relative cursor-pointer size-24 rounded-full overflow-hidden bg-neutral-100 dark:bg-black text-black dark:text-white font-semibold text-2xl flex items-center justify-center"
            >
              {image ? (
                <Image
                  src={image}
                  alt={user.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <p>{user.name.charAt(0).toUpperCase()}</p>
              )}
              <div className="absolute inset-0 flex flex-col items-center justify-center rounded-full bg-black/50 opacity-0 hover:opacity-100 transition">
                <Camera className="size-5" />
                <span className="text-xs text-white">Change</span>
              </div>
            </label>
            <p className="font-semibold mt-2.5">{user.name}</p>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
            {uploading && (
              <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                <div
                  className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
            )}
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              disabled={loading || uploading}
              onClick={handleUpdate}
              className="flex items-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" />
                  Loading...
                </>
              ) : (
                <p>Save</p>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManageProfileImage;
