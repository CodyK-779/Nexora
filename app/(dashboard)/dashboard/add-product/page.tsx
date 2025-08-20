"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Upload } from "lucide-react";
import Image from "next/image";
import { use, useState } from "react";

export default function AddProductPage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [inventory, setInventory] = useState(0);

  return (
    <section className="pt-2 px-2">
      {/* Header */}
      <h1 className="text-3xl font-semibold mb-8">
        Add New{" "}
        <span className="text-blue-700 dark:text-blue-600">Product</span>
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left column */}
        <div className="space-y-6">
          <Card className="border-2 border-neutral-300 dark:border-neutral-700">
            <CardHeader>
              <CardTitle>Product Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Product Name"
                className="py-5 border-2 border-neutral-300 dark:border-neutral-700"
              />
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description..."
                className="border-2 border-neutral-300 dark:border-neutral-700 h-32"
              />
              <Select>
                <SelectTrigger className="py-5 border-2 border-neutral-300 dark:border-neutral-700">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="electronics">Electronics</SelectItem>
                  <SelectItem value="clothing">Clothing</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          <Card className="border-2 border-neutral-300 dark:border-neutral-700">
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
                className="py-5 border-2 border-neutral-300 dark:border-neutral-700"
              />
              <Input
                type="number"
                value={inventory === 0 ? "" : inventory}
                onChange={(e) => {
                  const value = e.target.value;
                  setInventory(value === "" ? 0 : parseInt(value));
                }}
                placeholder="Product Inventory"
                className="py-5 border-2 border-neutral-300 dark:border-neutral-700"
              />
            </CardContent>
          </Card>
        </div>

        {/* Right column */}
        <Card className="border-2 border-neutral-300 dark:border-neutral-700">
          <CardHeader>
            <CardTitle>Images</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center border-2 border-dashed border-neutral-300 dark:border-neutral-700 rounded-lg p-6 text-center cursor-pointer">
              <Image
                src="/dropzone.png"
                alt="Image Dropzone"
                width={400}
                height={400}
                className="max-[450px]:w-[300] object-cover max-[450px]:-mt-10 -mt-16 hidden dark:block"
              />
              <Image
                src="/dropzone-light.png"
                alt="Image Dropzone"
                width={400}
                height={400}
                className="object-cover -mt-16 block dark:hidden"
              />
              <div className="flex max-[450px]:items-start items-center gap-2 max-[450px]:-mt-5 -mt-10">
                <Upload className="text-blue-600 dark:text-blue-500 max-[450px]:size-4" />
                <p className="text-xs sm:text-sm font-medium text-neutral-600 dark:text-neutral-300">
                  Drag & drop product images, or click to upload
                </p>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-3">
              {/* Uploaded image previews */}
              <div className="relative">
                <img src="/example.png" className="rounded-lg" />
                <button className="absolute top-1 right-1 bg-black/50 text-white p-1 rounded-full">
                  ✕
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <Button className="font-medium py-2 mt-7 text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200 ease-in">
        Publish Product
      </Button>
    </section>
  );
}
