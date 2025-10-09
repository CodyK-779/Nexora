import { Card, CardContent } from "./ui/card";
import { UserDetailsType } from "./InterfaceTypes";
import ManageProfileImage from "./ManageProfileImage";

export interface MockUserType {
  id: string;
  name: string;
  email: string;
  bio: string;
  emailVerified: boolean;
  image: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

interface Props {
  user: UserDetailsType;
}

const ProfileCard = ({ user }: Props) => {
  return (
    <div className="xl:col-span-1">
      <Card className="md:max-w-[350px] w-full md:place-self-center border-0 shadow-lg dark:bg-gray-900">
        <CardContent className="py-6 px-5">
          {/* Profile Summary */}
          <div className="text-center mb-6">
            <ManageProfileImage user={user} />
            <h2 className="min-[450px]:text-xl text-lg font-semibold text-gray-900 dark:text-white">
              {user.name}
            </h2>
            <p className="font-medium text-sm text-gray-500 dark:text-gray-400 mt-1">
              {user.email}
            </p>
          </div>

          {/* Stats */}
          <div className="space-y-4 border-t border-gray-300 dark:border-gray-600 pt-6">
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-600 dark:text-gray-400">
                Orders
              </span>
              <span className="font-semibold text-gray-900 dark:text-white">
                {user.order.length}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-600 dark:text-gray-400">
                Wishlist
              </span>
              <span className="font-semibold text-gray-900 dark:text-white">
                {user.wishList?.items.length}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-600 dark:text-gray-400">
                Joined date
              </span>
              <span className="font-semibold text-gray-900 dark:text-white">
                {new Date(user.createdAt).toLocaleDateString("en-GB")}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileCard;
