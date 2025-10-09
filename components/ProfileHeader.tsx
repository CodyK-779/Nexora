import { Edit, Settings } from "lucide-react";
import { Button } from "./ui/button";
import { Dispatch, SetStateAction } from "react";
import { useSession } from "@/app/lib/auth-client";
import { toast } from "sonner";

interface Props {
  id: string;
  name: string;
  currentUser: boolean;
  isEditing: boolean;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
}

const ProfileHeader = ({
  id,
  name,
  currentUser,
  isEditing,
  setIsEditing,
}: Props) => {
  const { data: session } = useSession();

  return (
    <div className="flex flex-col md:flex-row justify-between items-start lg:items-center gap-6 mb-8">
      <div>
        <h1 className="min-[450px]:text-3xl text-2xl font-semibold text-gray-900 dark:text-white">
          <span>{currentUser ? "My" : name.split(" ")[0] + "'s"}</span>{" "}
          <span className="text-blue-600 dark:text-blue-500">Profile</span>
        </h1>
        <p className="min-[450px]:text-base text-sm font-medium text-gray-600 dark:text-gray-400 mt-1.5">
          Manage your account, orders, and preferences
        </p>
      </div>
      <div className="flex gap-3">
        {currentUser && (
          <Button
            variant="outline"
            onClick={() => setIsEditing(!isEditing)}
            className="max-[450px]:small-btn flex items-center gap-2 dark:bg-black"
          >
            <Edit className="size-4" />
            {isEditing ? "Cancel Editing" : "Edit Profile"}
          </Button>
        )}
        <Button className="max-[450px]:small-btn flex items-center gap-2">
          <Settings className="size-4" />
          Settings
        </Button>
      </div>
    </div>
  );
};

export default ProfileHeader;
