import { Camera } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface EditFormType {
  name: string;
  bio: string;
  image: string;
}

interface Props {
  editForm: EditFormType;
  setEditForm: React.Dispatch<React.SetStateAction<EditFormType>>;
}

const UserImgChange = ({ editForm, setEditForm }: Props) => {
  return (
    <>
      <div className="flex items-center justify-center">
        <label htmlFor="image-upload" className="relative cursor-pointer">
          <Avatar className="size-16">
            <AvatarImage src={editForm.image} />
            <AvatarFallback>
              {editForm.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
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
          onChange={async (e) => {
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

              if (!res.ok) throw new Error("Upload failed");
              const data = await res.json();

              setEditForm((prev) => ({ ...prev, image: data.secure_url }));
            } catch (err) {
              console.error("Cloudinary upload error:", err);
            }
          }}
        />
      </div>
      <p className="text-center font-medium mt-2 pb-4">{editForm.name}</p>
    </>
  );
};

export default UserImgChange;
