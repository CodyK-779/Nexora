import { getAllCategories } from "@/actions/category-action";
import AddCategory from "@/components/AddCategory";
import CategoryTable from "@/components/CategoryTable";

export default async function ManageCategories() {
  const categories = await getAllCategories();

  return (
    <section className="pt-2 px-2">
      <h1 className="text-3xl font-semibold">
        Add New{" "}
        <span className="text-blue-700 dark:text-blue-600">Category</span>
      </h1>
      <AddCategory />
      <h1 className="mt-12 text-3xl font-semibold">
        Manage{" "}
        <span className="text-blue-700 dark:text-blue-600">Categories</span>
      </h1>
      <CategoryTable categories={categories} />
    </section>
  );
}
