import { MapPin } from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "./ui/card";
import { TabsContent } from "./ui/tabs";
import Link from "next/link";
import { Address } from "@/app/generated/prisma";
import AddressTabBtns from "./AddressTabBtns";
import { useSession } from "@/app/lib/auth-client";

interface Props {
  userId: string;
  address: Address[];
}

const AddressTab = ({ userId, address }: Props) => {
  const { data: session } = useSession();

  return (
    <TabsContent value="addresses" className="space-y-6">
      <Card className="border-0 shadow-lg dark:bg-gray-900">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Saved Addresses
          </CardTitle>
          <CardDescription className="font-medium">
            Manage your shipping addresses
          </CardDescription>
        </CardHeader>
        <CardContent>
          {address.length > 0 ? (
            <>
              <div className="grid md:grid-cols-2 gap-6">
                {address.map((address) => (
                  <Card
                    key={address.id}
                    className={`border-2 ${
                      address.isDefault
                        ? "border-blue-500"
                        : "border-gray-200 dark:border-gray-700"
                    }`}
                  >
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {address.title}
                        </h3>
                        {address.isDefault && (
                          <Badge textSize="text-[10px]" variant="default">
                            Default
                          </Badge>
                        )}
                      </div>
                      <div className="flex flex-col min-[400px]:text-base text-sm text-gray-600 dark:text-gray-400 mb-2">
                        <p className="line-clamp-1">{address.street}</p>
                        <p>
                          {address.city}, {address.state} {address.postalCode}
                        </p>
                        <p>{address.country}</p>
                      </div>

                      <AddressTabBtns userId={userId} address={address} />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <MapPin className="min-[450px]:size-16 size-14 text-gray-300 mx-auto mb-4" />
              <h3 className="min-[460px]:text-lg min-[400px]:text-base text-sm font-semibold text-gray-900 dark:text-white mb-2">
                You haven’t added any addresses yet.
              </h3>
              <p className="min-[460px]:text-base text-sm text-gray-600 dark:text-gray-400">
                Add your first address to make checkout faster.
              </p>
            </div>
          )}

          {session?.user.id === userId && (
            <Button className="mt-6 max-[400px]:small-btn" asChild>
              <Link href="/address" className="flex items-center  gap-2">
                <MapPin className="size-4" />
                Add New Address
              </Link>
            </Button>
          )}
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default AddressTab;
