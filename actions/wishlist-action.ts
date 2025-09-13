"use server";

import { auth } from "@/app/lib/auth";
import { prisma } from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

export async function getCurrentUserWishlist() {
  try {
    const session = await auth.api.getSession({
      headers: await headers()
    });

    if (!session) return;

    const wishList = await prisma.wishList.upsert({
      where: { userId: session.user.id },
      update: {},
      create: { userId: session.user.id },
      include: { items: true }
    });

    return wishList;
  } catch (error) {
    console.error("Failed to get user's wishlist", error);
    throw new Error("Failed to get user's wishlist");
  }
}

export async function toggleWishList(productId: string, path: string) {
  try {
    const session = await auth.api.getSession({
      headers: await headers()
    });

    if (!session) throw new Error("Unauthorized");

    const wishlist = await prisma.wishList.upsert({
      where: { userId: session.user.id },
      update: {},
      create: { userId: session.user.id },
      include: { items: true }
    });

    const existingProduct = wishlist.items.find(item => item.productId === productId);

    if (existingProduct) {
      await prisma.wishListItem.delete({
        where: {
          id: existingProduct.id
        }
      });
    } else {
      await prisma.wishListItem.create({
        data: {
          productId,
          wishListId: wishlist.id,
        }
      })
    }

    revalidatePath(path);
    return { success: true };
  } catch (error) {
    console.error("Error toggling wishlist:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Failed to update wishlist" 
    };
  }
}
