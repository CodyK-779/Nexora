"use server";

import { auth } from "@/app/lib/auth";
import { prisma } from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

export async function getUserWishlist(userId: string) {
  try {
    const session = await auth.api.getSession({
      headers: await headers()
    });

    if (!session) return;

    const wishList = await prisma.wishList.upsert({
      where: { userId },
      update: {},
      create: { userId },
      include: { items: true }
    });

    return wishList;
  } catch (error) {
    console.error("Failed to get user's wishlist", error);
    throw new Error("Failed to get user's wishlist");
  }
}

export async function getCurrentUserWishlist() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) return null;

    let wishList = await prisma.wishList.findUnique({
      where: { userId: session.user.id },
      include: { items: true },
    });

    if (!wishList) {
      try {
        wishList = await prisma.wishList.create({
          data: { userId: session.user.id },
          include: { items: true },
        });
      } catch (err: any) {
        if (err.code === "P2002") {
          wishList = await prisma.wishList.findUnique({
            where: { userId: session.user.id },
            include: { items: true },
          });
        } else {
          throw err;
        }
      }
    }

    return wishList;
  } catch (error) {
    console.error("Failed to get user's wishlist", error);
    return null;
  }
}


export async function getFilteredWishlistItems( userId: string, search: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        wishList: true
      }
    });

    if (!user?.wishList) return [];

    const items = await prisma.wishListItem.findMany({
      where: {
        wishListId: user.wishList.id,
        product: {
          name: {
            contains: search,
            mode: "insensitive"
          }
        }
      },
      include: {
        product: {
          include: {
            category: {
              select: {
                name: true
              }
            }
          }
        }
      }
    });

    return items;
  } catch (error) {
    console.error("Failed to get user's wishlisted products", error);
    throw new Error("Failed to get user's wishlisted products");
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

export async function removeWishlistItem(wishListItemId: string, path: string) {
  try {
    await prisma.wishListItem.delete({
      where: {
        id: wishListItemId
      }
    });

    revalidatePath(path);
    return { success: true }
  } catch (error) {
    console.error("Error deleting wishlisted item:", error);
    return { success: false, error: "Failed to delete wishlisted item" };
  }
}
