"use client";

import { UploadedFile } from "@/app/(dashboard)/dashboard/add-product/page";
import { useState } from "react";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import ImageUpload from "./ImageUpload";
import { Textarea } from "./ui/textarea";
import { Category } from "@/app/generated/prisma";

interface Props {
  categories: Category[];
}

const AddProduct = ({ categories }: Props) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [inventory, setInventory] = useState(0);
  const [images, setImages] = useState<UploadedFile[]>([]);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left column */}
        <div className="space-y-6">
          <Card className="border-2 border-neutral-200 dark:border-neutral-700">
            <CardHeader>
              <CardTitle>Product Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Product Name"
                className="py-5 border-2 border-neutral-200 dark:border-neutral-700"
              />
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description..."
                className="border-2 border-neutral-200 dark:border-neutral-700 h-32"
              />
              <Select>
                <SelectTrigger className="py-5 border-2 border-neutral-200 dark:border-neutral-700">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.name}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          <Card className="border-2 border-neutral-200 dark:border-neutral-700">
            <CardHeader>
              <CardTitle>Pricing & Inventory</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <Input
                type="number"
                value={price === 0 ? "" : price}
                onChange={(e) => {
                  const value = e.target.value;
                  setPrice(value === "" ? 0 : parseInt(value));
                }}
                placeholder="Product Price"
                className="py-5 border-2 border-neutral-200 dark:border-neutral-700"
              />
              <Input
                type="number"
                value={inventory === 0 ? "" : inventory}
                onChange={(e) => {
                  const value = e.target.value;
                  setInventory(value === "" ? 0 : parseInt(value));
                }}
                placeholder="Product Inventory"
                className="py-5 border-2 border-neutral-200 dark:border-neutral-700"
              />
            </CardContent>
          </Card>
        </div>

        {/* Right column */}
        <ImageUpload images={images} setImages={setImages} />
      </div>
      <div className="grid place-content-center md:place-content-start">
        <Button className="font-medium py-2 mt-7 text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200 ease-in">
          Publish Product
        </Button>
      </div>
    </>
  );
};

export default AddProduct;
