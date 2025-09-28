"use client";

import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import CategoryEdit from "./CategoryEdit";
import CategoryDelete from "./CategoryDelete";

interface Props {
  id: string;
  name: string;
  image: string;
}

const CategoryDropdown = ({ id, name, image }: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <MoreHorizontal />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <CategoryEdit id={id} name={name} image={image} />
          <CategoryDelete id={id} />
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CategoryDropdown;
