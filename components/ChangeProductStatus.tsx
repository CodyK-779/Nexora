import { Status } from "@/app/generated/prisma";
import {
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "./ui/dropdown-menu";
import { CheckCheckIcon } from "lucide-react";
import { updateStatus } from "@/actions/product-action";
import { toast } from "sonner";

interface Props {
  id: string;
  status: Status;
}

const ChangeProductStatus = ({ id, status }: Props) => {
  const handleRoleChange = async () => {
    const result = await updateStatus(id);

    if (result.success) {
      toast.success("Status Updated Successfully!");
    } else {
      toast.error("Failed to update status");
    }
  };

  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger className="flex items-center gap-2.5 cursor-pointer">
        <CheckCheckIcon />
        Change Status
      </DropdownMenuSubTrigger>
      <DropdownMenuSubContent>
        <DropdownMenuItem
          disabled={status === "Popular"}
          className="cursor-pointer"
          onClick={handleRoleChange}
        >
          Popular
        </DropdownMenuItem>
        <DropdownMenuItem
          disabled={status === "Normal"}
          className="cursor-pointer"
          onClick={handleRoleChange}
        >
          Normal
        </DropdownMenuItem>
      </DropdownMenuSubContent>
    </DropdownMenuSub>
  );
};

export default ChangeProductStatus;
