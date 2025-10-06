import { MapPin } from "lucide-react";
import { mockAddresses } from "./ProfileData";
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

const AddressTab = () => {
  return (
    <TabsContent value="addresses" className="space-y-6">
      <Card className="border-0 shadow-lg dark:bg-gray-900">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Saved Addresses
          </CardTitle>
          <CardDescription>Manage your shipping addresses</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            {mockAddresses.map((address) => (
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
                  <p className="text-gray-600 dark:text-gray-400 mb-2">
                    {address.street}
                    <br />
                    {address.city}, {address.state} {address.postalCode}
                    <br />
                    {address.country}
                  </p>
                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                    {!address.isDefault && (
                      <Button variant="outline" size="sm">
                        Set as Default
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <Button className="mt-6" asChild>
            <Link href="/address" className="flex items-center gap-2">
              <MapPin className="size-4" />
              Add New Address
            </Link>
          </Button>
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default AddressTab;
