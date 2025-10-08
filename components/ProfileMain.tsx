import { Dispatch, SetStateAction } from "react";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import { User, ShoppingBag, Heart, MapPin } from "lucide-react";
import OverviewTab from "./OverviewTab";
import { UserDetailsType } from "./InterfaceTypes";
import OrdersTab from "./OrdersTab";
import WishListTab from "./WishListTab";
import AddressTab from "./AddressTab";

interface Props {
  user: UserDetailsType;
  isEditing: boolean;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
  activeTab: string;
  setActiveTab: Dispatch<SetStateAction<string>>;
}

const ProfileMain = ({
  user,
  isEditing,
  setIsEditing,
  activeTab,
  setActiveTab,
}: Props) => {
  return (
    <div className="xl:col-span-3">
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="grid w-full grid-cols-4 dark:bg-gray-900">
          <TabsTrigger
            value="overview"
            className="flex items-center gap-2 min-[450px]:text-sm text-xs"
          >
            <User className="size-4 sm:block hidden" />
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="orders"
            className="flex items-center gap-2 min-[450px]:text-sm text-xs"
          >
            <ShoppingBag className="size-4 sm:block hidden" />
            Orders
          </TabsTrigger>
          <TabsTrigger
            value="wishlist"
            className="flex items-center gap-2 min-[450px]:text-sm text-xs"
          >
            <Heart className="size-4 sm:block hidden" />
            Wishlist
          </TabsTrigger>
          <TabsTrigger
            value="addresses"
            className="flex items-center gap-2 min-[450px]:text-sm text-xs"
          >
            <MapPin className="size-4 sm:block hidden" />
            Addresses
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <OverviewTab
          user={user}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
        />

        {/* Orders Tab */}
        <OrdersTab orders={user.order} />

        {/* Wishlist Tab */}
        <WishListTab userId={user.id} wishlist={user.wishList} />

        {/* Addresses Tab */}
        <AddressTab userId={user.id} address={user.address} />
      </Tabs>
    </div>
  );
};

export default ProfileMain;
