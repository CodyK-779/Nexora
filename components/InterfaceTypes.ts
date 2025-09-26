import { $Enums, Address, CartItem, OrderItem, Product, User, WishListItem } from "@/app/generated/prisma";

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

export interface CartItemType {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  cardId: string;
  productId: string;
  quantity: number;
  product: Product;
}

export interface OrderItemType {
  id: string;
  productId: string;
  quantity: number;
  price: number;
  orderId: string;
  product: Product
}

export interface OrdersType {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  addressId: string;
  total: number;
  status: $Enums.OrderStatus;
  orderItem: OrderItemType[];
  address: Address;
}

export interface DashOrderType {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  addressId: string;
  total: number;
  status: $Enums.OrderStatus;
  user: User;
  address: Address;
  orderItem: OrderItemType[];
}