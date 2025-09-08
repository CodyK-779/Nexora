import { DropdownMenuItem } from "./ui/dropdown-menu";
import { CheckCheckIcon } from "lucide-react";

const ChangeProductStatus = () => {
  return (
    <DropdownMenuItem className="flex items-center gap-2.5 cursor-pointer">
      <CheckCheckIcon />
      Change Status
    </DropdownMenuItem>
  );
};

export default ChangeProductStatus;
