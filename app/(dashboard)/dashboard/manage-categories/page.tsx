import AddCategory from "@/components/AddCategory";

export default function ManageCategories() {
  return (
    <section className="pt-2 px-2">
      <h1 className="text-3xl font-semibold">
        Add New{" "}
        <span className="text-blue-700 dark:text-blue-600">Category</span>
      </h1>
      <AddCategory />
    </section>
  );
}
