"use server";

import { Status } from "@/app/generated/prisma";
import { prisma } from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getAllProducts(search?: string) {
  try {
    const products = await prisma.product.findMany({
      where: {
        name: {
          contains: search,
          mode: 'insensitive',
        },
      },
      include: {
        category: true
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
    const existingProduct = await prisma.product.findFirst({
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

    if (existingProduct) {
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
      },
      include: {
        category: true
      },
      take: 4
    });

    return products;
  } catch (error) {
    console.error("Error getting popular products:", error);
    throw new Error("Failed to get popular products");
  }
}

export async function getProductDetails(id: string) {
  try {
    if (!id) return;

    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        wishListItems: true,
        category: {
          select: {
            name: true
          }
        }
      }
    });

    return product;
  } catch (error) {
    console.error("Error getting product details:", error);
    throw new Error("Failed to get product details");
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

export async function updateProduct(id: string, formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const categoryId = formData.get("categoryId") as string;
    const rawPrice = formData.get("price") as string;
    const rawImages = formData.getAll("images") as string[];
    const images = rawImages.filter((img) => img && typeof img === "string");
    const price = parseFloat(rawPrice);

    const dataToUpdate: any = {
      name,
      description,
      categoryId,
      price
    };

    if (images.length > 0) {
      dataToUpdate.images = images;
    }

    await prisma.product.update({
      where: { id },
      data: dataToUpdate,
    });

    revalidatePath("/dashboard/products");
    return { success: true };
  } catch (error) {
    console.error("Error updating product:", error);
    return { success: false, error: "Failed to update product" };
  }
}

export async function updateStatus(id: string, status: Status) {
  try {
    const product = await prisma.product.findUnique({
      where: { id }
    });

    if (!product) return { error: "This product doesn't exist" };

    await prisma.product.update({
      where: { id },
      data: {
        status
      }
    });

    revalidatePath("/dashboard/products");
    return { success: true };
  } catch (error) {
    console.error("Error updating status:", error);
    return { success: false, error: "Failed to update status of this product" };
  }
}

export async function updateInventory(id: string, inventory: number) {
  try {
    if (!id) return;

    await prisma.product.update({
      where: { id },
      data: {
        inventory
      }
    });

    revalidatePath("/dashboard/products");
    return { success: true };
  } catch (error) {
    console.error("Error updating inventory:", error);
    return { success: false, error: "Failed to update the inventory of this product" };
  }
}

export async function deleteProduct(id: string) {
  try {
    if (!id) return;

    await prisma.product.delete({
      where: { id }
    });

    revalidatePath("/dashboard/products");
    return { success: true }
  } catch (error) {
    console.error("Error deleting this product:", error);
    return { success: false, error: "Failed to delete this product" };
  }
}
