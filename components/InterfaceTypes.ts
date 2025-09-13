import { $Enums, CartItem, WishListItem } from "@/app/generated/prisma";

export interface WishListType {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  items: WishListItem[];
}

export interface WishListItemType {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  productId: string;
  wishListId: string;
}

export interface CartType {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  cartItem: CartItem[];
}

export interface ProductDetailsType {
  name: string;
  id: string;
  description: string;
  price: number;
  images: string[];
  categoryId: string;
  status: $Enums.Status;
  inventory: number;
  createdAt: Date;
  updatedAt: Date;
  wishListItems: WishListItemType[];
  category: {
    name: string;
  };
}
