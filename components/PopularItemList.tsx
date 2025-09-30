import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

const items = [
  {
    img: "/hoodie.png",
    name: "Black hoodie",
    orders: "1,902",
  },
  {
    img: "/nike.png",
    name: "Nike Jordan 1 Retro High Dior",
    orders: "1,902",
  },
  {
    img: "/leather.png",
    name: "Black biker leather jacket",
    orders: "1,902",
  },
  {
    img: "/ps5.png",
    name: "Play Station 5 Pro",
    orders: "1,902",
  },
];

const PopularItemList = () => {
  return (
    <Card className="border-2">
      <CardHeader className="items-center mb-2">
        <CardTitle>Most Popular Items</CardTitle>
        <CardDescription>July - Augest 2025</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {items.map((item, index) => (
          <div key={index + 1} className="flex items-center gap-4">
            <div className="p-1 rounded-md bg-white border border-neutral-300 shadow">
              <Image
                src={item.img}
                alt={item.name}
                width={40}
                height={40}
                className="object-contain rounded"
              />
            </div>
            <div className="flex flex-col items-start">
              <p className="text-sm font-semibold">{item.name}</p>
              <p className="text-sm font-medium text-neutral-500 dark:text-neutral-300">
                {item.orders} Orders
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default PopularItemList;
