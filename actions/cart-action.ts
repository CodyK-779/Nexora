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
