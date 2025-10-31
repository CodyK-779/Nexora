import { Category } from "@/app/generated/prisma";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import Image from "next/image";
import CategoryDropdown from "./CategoryDropdown";

interface Props {
  categories: Category[];
}

const CategoryTable = ({ categories }: Props) => {
  return (
    <div className="mt-6 border-2 rounded-lg sm:max-w-[600px] w-full overflow-hidden sm:pl-3">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Id</TableHead>
            <TableHead>Image</TableHead>
            <TableHead>Category name</TableHead>
            <TableHead>Menu</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.map((cat, idx) => (
            <TableRow key={cat.id}>
              <TableCell>{idx + 1}</TableCell>
              <TableCell>
                <div className="bg-white w-fit rounded border shadow border-neutral-300">
                  <Image
                    src={cat.image}
                    alt="category image"
                    width={25}
                    height={25}
                  />
                </div>
              </TableCell>
              <TableCell>{cat.name}</TableCell>
              <TableCell>
                <CategoryDropdown
                  id={cat.id}
                  name={cat.name}
                  image={cat.image}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CategoryTable;
