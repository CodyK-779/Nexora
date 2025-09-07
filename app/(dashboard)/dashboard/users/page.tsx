import { getAllUsers } from "@/actions/user-action";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export const creatorId = "89nUHGBsm0qVXKXSL0KpJpmvJ2J3BPPJ";

export default async function DashboardUsers() {
  const users = await getAllUsers();

  return (
    <section className="pt-2 px-2">
      <h1 className="text-3xl font-semibold">
        Manage <span className="text-blue-700 dark:text-blue-600">Users</span>
      </h1>
      <div className="container mx-auto py-6">
        <DataTable columns={columns} data={users} />
      </div>
    </section>
  );
}
