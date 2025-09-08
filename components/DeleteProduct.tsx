import { Trash2Icon } from "lucide-react";
import { DropdownMenuItem } from "./ui/dropdown-menu";

const DeleteProduct = () => {
  return (
    <DropdownMenuItem className="flex items-center gap-2.5 cursor-pointer">
      <Trash2Icon />
      Delete Product
    </DropdownMenuItem>
  );
};

export default DeleteProduct;
