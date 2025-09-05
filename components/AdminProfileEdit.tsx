"use client";

import { Edit } from "lucide-react";
import { DropdownMenuItem } from "./ui/dropdown-menu";

const AdminProfileEdit = () => {
  return (
    <DropdownMenuItem
      className="flex items-center gap-3 cursor-pointer"
      onClick={(e) => e.preventDefault()}
    >
      <Edit />
      Edit Profile
    </DropdownMenuItem>
  );
};

export default AdminProfileEdit;
