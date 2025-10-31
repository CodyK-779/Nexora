import { getAllProducts } from "@/actions/product-action";
import { DataTable } from "./data-table";
import { getAllCategories } from "@/actions/category-action";

export default async function Products() {
  const [products, categories] = await Promise.all([
    getAllProducts(),
    getAllCategories(),
  ]);

  return (
    <section className="pt-2 px-2">
      <h1 className="text-3xl font-semibold">
        Manage{" "}
        <span className="text-blue-700 dark:text-blue-600">Products</span>
      </h1>

      <div className="container mx-auto py-6">
        <DataTable data={products} categories={categories} />
      </div>
    </section>
  );
}
