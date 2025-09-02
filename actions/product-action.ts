"use server";

import { prisma } from "@/app/lib/prisma";

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
    console.error("Failed to get popular products", error);
    throw new Error("Failed to get popular products");
  }
}