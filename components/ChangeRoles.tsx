"use client";

import { UserCheck2 } from "lucide-react";
import {
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "./ui/dropdown-menu";
import { Role } from "@/app/generated/prisma";
import { changeRole } from "@/actions/user-action";
import { toast } from "sonner";
import { useSession } from "@/app/lib/auth-client";
import { creatorId } from "@/app/(dashboard)/dashboard/users/page";

interface Props {
  userId: string;
  role: Role;
}

const ChangeRoles = ({ userId, role }: Props) => {
  const { data: session } = useSession();

  if (!session) return;

  const handleRoleChange = async () => {
    if (userId === session.user.id) {
      toast.error("You cannot change your own role");
      return;
    }

    if (userId === creatorId) {
      toast.error("You cannot change the creator's role");
      return;
    }

    try {
      const results = await changeRole(userId);

      if (results.success) {
        toast.success("Changed User Role Successfully!");
      }
    } catch (error) {
      toast.error("Failed to change user role");
    }
  };

  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger className="flex items-center gap-3 cursor-pointer">
        <UserCheck2 />
        Change Roles
      </DropdownMenuSubTrigger>
      <DropdownMenuSubContent>
        <DropdownMenuItem
          disabled={role === "ADMIN"}
          onClick={handleRoleChange}
        >
          Admin
        </DropdownMenuItem>
        <DropdownMenuItem disabled={role === "USER"} onClick={handleRoleChange}>
          User
        </DropdownMenuItem>
      </DropdownMenuSubContent>
    </DropdownMenuSub>
  );
};

export default ChangeRoles;
