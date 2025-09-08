"use server";

import { prisma } from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getAllProducts() {
  try {
    const products = await prisma.product.findMany({
      include: {
        category: {
          select: {
            name: true
          }
        }
      }
    });

    return products;
  } catch (error) {
    console.error("Failed to get products", error);
    throw new Error("Failed to get products");
  }
}

export async function addProduct(name: string, description: string, price: number, inventory: number, category: string, images: string[]) {
  try {
    const exisitingProduct = await prisma.product.findFirst({
      where: {
        name,
        description,
        price,
        inventory,
        categoryId: category,
        images: {
          hasSome: images
        }
      }
    });

    if (exisitingProduct) {
      return { error: "This product already exists." }
    }

    await prisma.product.create({
      data: {
        name,
        description,
        price,
        inventory,
        images,
        category: {
          connect: { id: category }
        }
      }
    });

    return { success: true }
  } catch (error) {
    console.error("Failed to create new product", error);
    throw new Error("Failed to create new product");
  }
}

export async function getPopularProducts() {
  try {
    const products = prisma.product.findMany({
      where: {
        status: "Popular"
      }
    });

    return products;
  } catch (error) {
    console.error("Error getting popular products:", error);
    return { success: false, error: "Failed to get popular products" };
  }
}

export async function selectedProductsDelete(ids: string[]) {
  try {
    if (!ids || ids.length === 0) {
      return { error: "No product ids provided" }
    }

    await prisma.product.deleteMany({
      where: {
        id: {
          in: ids
        }
      }
    });

    revalidatePath("/dashboard/products");
    return { success: true }
  } catch (error) {
    console.error("Error deleting selected products:", error);
    return { success: false, error: "Failed to delete selected products" };
  }
}