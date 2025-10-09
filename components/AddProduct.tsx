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
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { addProduct } from "@/actions/product-action";
import { useRouter } from "next/navigation";

interface Props {
  categories: Category[];
}

const AddProduct = ({ categories }: Props) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [inventory, setInventory] = useState(0);
  const [category, setCategory] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [imgInfo, setImgInfo] = useState<UploadedFile[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const resetForm = () => {
    setName("");
    setDescription("");
    setPrice(0);
    setInventory(0);
    setImgInfo([]);
    setImages([]);
  };

  const handleUpload = async () => {
    if (
      !name.trim() ||
      !description.trim() ||
      price === 0 ||
      inventory === 0 ||
      !category.trim() ||
      images.length === 0
    ) {
      toast.error("Please fill in all product details before submitting.");
      return;
    }

    setLoading(true);

    try {
      const results = await addProduct(
        name,
        description,
        price,
        inventory,
        category,
        images
      );

      if (results.success) {
        toast.success("New Product Published Successfully!");
        resetForm();
        router.push("/dashboard/add-product", { scroll: false });
      }
    } catch (error) {
      toast.error("Failed to publish new product.");
      resetForm();
    } finally {
      setLoading(false);
    }
  };

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
              <Select onValueChange={(value: string) => setCategory(value)}>
                <SelectTrigger className="py-5 border-2 border-neutral-200 dark:border-neutral-700">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
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
                  setPrice(value === "" ? 0 : parseFloat(value));
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
        <ImageUpload
          imgInfo={imgInfo}
          setImgInfo={setImgInfo}
          setImages={setImages}
        />
      </div>
      <div className="grid sm:place-content-center md:place-content-start">
        <Button
          className="w-full min-[375px]:large-btn flex items-center gap-2 font-medium py-2 mt-7 text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200 ease-in"
          disabled={loading}
          onClick={handleUpload}
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin" />
              <p>Publishing...</p>
            </>
          ) : (
            <p>Publish Product</p>
          )}
        </Button>
      </div>
    </>
  );
};

export default AddProduct;
