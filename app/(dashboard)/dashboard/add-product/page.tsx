import { getAllCategories } from "@/actions/category.action";
import AddProduct from "@/components/AddProduct";

export type UploadedFile = {
  url: string;
  name: string;
  size: number;
};

export default async function AddProductPage() {
  const categories = await getAllCategories();

  return (
    <section className="pt-2 px-2">
      {/* Header */}
      <h1 className="max-[400px]:text-2xl text-3xl font-semibold mb-8">
        Add New{" "}
        <span className="text-blue-700 dark:text-blue-600">Product</span>
      </h1>
      <AddProduct categories={categories} />
    </section>
  );
}
