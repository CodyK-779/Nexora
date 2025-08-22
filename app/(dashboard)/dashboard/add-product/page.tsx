import AddProduct from "@/components/AddProduct";

export type UploadedFile = {
  url: string;
  name: string;
  size: number;
};

export default function AddProductPage() {
  return (
    <section className="pt-2 px-2">
      {/* Header */}
      <h1 className="text-3xl font-semibold mb-8">
        Add New{" "}
        <span className="text-blue-700 dark:text-blue-600">Product</span>
      </h1>
      <AddProduct />
    </section>
  );
}
