import {
  CheckCircle2,
  Clock,
  Loader2,
  Package,
  Star,
  User,
} from "lucide-react";
import { TabsContent } from "./ui/tabs";
import { Input } from "./ui/input";
import { UserDetailsType } from "./InterfaceTypes";
import { Badge } from "./ui/badge";
import { Textarea } from "./ui/textarea";
import { Dispatch, SetStateAction, useState } from "react";
import { Button } from "./ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "./ui/card";
import { toast } from "sonner";
import { editProfileOverview } from "@/actions/user-action";

interface Props {
  user: UserDetailsType;
  isEditing: boolean;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
}

const OverviewTab = ({ isEditing, setIsEditing, user }: Props) => {
  const [loading, setLoading] = useState(false);
  const [editForm, setEditForm] = useState({
    name: user.name || "",
    bio: user.bio || "",
  });

  const handleUpdate = async () => {
    if (!editForm.name.trim()) {
      return toast.error("Name cannot be empty.");
    }

    setLoading(true);

    try {
      const formData = new FormData();
      Object.entries(editForm).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const result = await editProfileOverview(
        user.id,
        formData,
        `/profile/${user.id}`
      );

      if (result.success) {
        toast.success("Profile edited successfully!");
      } else {
        toast.error("Failed to update profile");
      }
    } catch (error) {
      console.error("Failed to update profile", error);
    } finally {
      setLoading(false);
      setIsEditing(false);
    }
  };

  return (
    <TabsContent value="overview" className="space-y-6">
      <Card className="border-0 shadow-lg dark:bg-gray-900">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Personal Information
          </CardTitle>
          <CardDescription>
            Manage your personal details and preferences
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Full Name
                </label>
              </div>
              {isEditing ? (
                <Input
                  value={editForm.name}
                  onChange={(e) =>
                    setEditForm({ ...editForm, name: e.target.value })
                  }
                  className="border-neutral-300 dark:border-gray-700"
                />
              ) : (
                <p className="font-medium min-[450px]:text-base text-sm text-gray-900 dark:text-white">
                  {user.name}
                </p>
              )}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 ">
                  Email Address
                </label>
                {user.emailVerified && (
                  <Badge
                    textSize="text-[10.5px]"
                    variant="outline"
                    className="bg-green-50 text-green-700 dark:bg-green-900 dark:text-green-300"
                  >
                    <CheckCircle2 className="h-3 w-3 mr-1" />
                    Verified
                  </Badge>
                )}
              </div>
              <p className="font-medium min-[450px]:text-base text-sm text-gray-900 dark:text-white">
                {user.email}
              </p>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
              Bio
            </label>
            {isEditing ? (
              <Textarea
                value={editForm.bio || ""}
                onChange={(e) =>
                  setEditForm({ ...editForm, bio: e.target.value })
                }
                placeholder="Tell us about yourself..."
                className="min-h-28 shadow border-neutral-300 dark:border-gray-700"
              />
            ) : (
              <p className="font-medium min-[450px]:text-base text-sm text-gray-600 dark:text-gray-400">
                {user.bio || "No bio added yet."}
              </p>
            )}
          </div>

          {isEditing && (
            <div className="flex gap-3 pt-4">
              <Button
                disabled={loading}
                onClick={handleUpdate}
                className="flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin" />
                    Updating...
                  </>
                ) : (
                  <p>Save Changes</p>
                )}
              </Button>
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card className="border-0 shadow-lg dark:bg-gray-900">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="size-5" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <Package className="min-[450px]:size-6 size-5 text-blue-600" />
              <div>
                <p className="font-medium min-[450px]:text-base min-[350px]:text-sm text-xs text-gray-900 dark:text-white">
                  Order #ORD-001 delivered
                </p>
                <p className="min-[450px]:text-sm text-xs text-gray-600 dark:text-gray-400">
                  Yesterday at 2:30 PM
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <Star className="min-[450px]:size-6 size-5 text-green-600" />
              <div>
                <p className="font-medium min-[450px]:text-base min-[350px]:text-sm text-xs  text-gray-900 dark:text-white">
                  Added item to wishlist
                </p>
                <p className="min-[450px]:text-sm text-xs text-gray-600 dark:text-gray-400">
                  2 days ago
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default OverviewTab;
