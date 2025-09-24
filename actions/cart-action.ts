"use server";

import { auth } from "@/app/lib/auth";
import { prisma } from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

export async function getCurrentUserCart() {
  try {
    const session = await auth.api.getSession({
      headers: await headers()
    });

    if (!session) return;

    const cart = await prisma.cart.upsert({
      where: { userId: session.user.id },
      update: {},
      create: { userId: session.user.id },
      include: { cartItem: true }
    });

    return cart;
  } catch (error) {
    console.error("Failed to get user's cart", error);
    throw new Error("Failed to get user's cart");
  }
}

export async function addProductToCart(productId: string, path: string) {
  try {
    const session = await auth.api.getSession({
      headers: await headers()
    });

    if (!session) throw new Error("Unauthorized");

    const cart = await prisma.cart.upsert({
      where: { userId: session.user.id },
      update: {},
      create: { userId: session.user.id },
      include: { cartItem: true }
    });

    const existingProduct = cart.cartItem.find(item => item.productId === productId);

    if (existingProduct) {
      await prisma.cartItem.update({
        where: { id: existingProduct.id },
        data: {
          quantity: existingProduct.quantity + 1
        }
      });
    } else {
      await prisma.cartItem.create({
        data: {
          productId,
          cardId: cart.id
        }
      });
    }

    revalidatePath(path);
    return { success: true }
  } catch (error) {
    console.error("Error add this product to cart:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Failed to add this product to cart" 
    };
  }
}

export async function getCartItems(userId: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { cart: true }
    });

    if (!user?.cart) return [];

    const items = await prisma.cartItem.findMany({
      where: { cardId: user.cart.id },
      include: {
        product: true,
      },
    });

    return items;
  } catch (error) {
    console.error("Failed to get user's cart items", error);
    throw new Error("Failed to get user's cart items");
  }
}

export async function increaseQuantity(cartItemId: string, path: string) {
  try {
    await prisma.cartItem.update({
      where: { id: cartItemId },
      data: {
        quantity: {
          increment: 1
        }
      }
    });

    revalidatePath(path);
    return { success: true }
  } catch (error) {
    console.error("Error failed to increment quantity:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Failed to increment quantity" 
    };
  }
}

export async function decreaseQuantity(cartItemId: string, path: string) {
  try {
    await prisma.cartItem.update({
      where: { id: cartItemId },
      data: {
        quantity: {
          decrement: 1
        }
      }
    });

    revalidatePath(path);
    return { success: true }
  } catch (error) {
    console.error("Error failed to decrease quantity:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Failed to decrease quantity" 
    };
  }
}

export async function deleteCartItem(cartItemId: string, path: string) {
  try {
    await prisma.cartItem.delete({
      where: { id: cartItemId }
    });

    revalidatePath(path);
    return { success: true };
  } catch (error) {
    console.error("Error failed to delete cart item:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Failed to delete cart item" 
    };
  }
}

export async function getTotalCartItems(userId: string) {
  try {
    const results = await prisma.cartItem.aggregate({
      _sum: {
        quantity: true
      },
      where: {
        cart: {
          userId
        }
      }
    });

    const totalCount = results._sum.quantity || 0;

    return totalCount;
  } catch (error) {
    console.error("Failed to get total cartItem count", error);
    throw new Error("Failed to get total cartItem count");
  }
}