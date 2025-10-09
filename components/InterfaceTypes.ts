import { $Enums, Address, Cart, CartItem, Category, Product, User, WishListItem } from "@/app/generated/prisma";

export const creatorId = "9a45ASFRxYfeQRskZjC2kCCEWTtMIS8e";

export interface ProductType {
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
  category: {
    name: string;
  }
}

export interface ShopWishListType {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  items: WishListItem[]
}

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
  product: ProductType;
}

export interface CartType {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  cartItem: CartItem[];
}

export interface WishListTabType {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  items: WishListItemType[];
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
  wishListItems: WishListItem[];
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

export interface ProductsType {
  name: string;
  id: string;
  createdAt: Date;
  updatedAt: Date;
  description: string;
  price: number;
  images: string[];
  categoryId: string;
  status: $Enums.Status;
  inventory: number;
  category: Category;
}

export interface UserDetailsType {
  name: string;
  id: string;
  email: string;
  bio: string | null;
  emailVerified: boolean;
  image: string | null;
  role: $Enums.Role;
  createdAt: Date;
  updatedAt: Date;
  address: Address[];
  order: OrdersType[];
  cart: Cart | null;
  wishList: WishListTabType | null;
}