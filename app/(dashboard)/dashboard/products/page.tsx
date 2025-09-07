import { getAllProducts, getPopularProducts } from "@/actions/product-action";
import MobileProductList from "@/components/MobileProductList";
import { columns, Payment } from "./columns";
import { DataTable } from "./data-table";

export default async function Products() {
  const products = await getAllProducts();

  return (
    <section className="pt-2 px-2">
      <h1 className="text-3xl font-semibold">
        Manage{" "}
        <span className="text-blue-700 dark:text-blue-600">Products</span>
      </h1>

      <div className="hidden sm:block container mx-auto py-10">
        <DataTable columns={columns} data={products} />
      </div>

      <div className="sm:hidden">
        <MobileProductList products={products} />
      </div>
    </section>
  );
}
