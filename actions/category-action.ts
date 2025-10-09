"use server";

import { prisma } from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createCategory(name: string, image: string) {
  try {
    const existingCategory = await prisma.category.findUnique({
      where: { name }
    });

    if (existingCategory) {
      return { error: "This category already exists." }
    }

    await prisma.category.create({
      data: {
        name,
        image
      }
    });

    revalidatePath("/dashboard/manage-categories");
    return { success: true }
  } catch (error) {
    console.error("Failed to create new category", error);
    throw new Error("Failed to create new category");
  }
}

export async function updateCategory(id: string, formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const image = formData.get("image") as string;

    await prisma.category.update({
      where: { id },
      data: {
        name,
        image
      }
    });

    revalidatePath("/dashboard/manage-categories");
    return { success: true }
  } catch (error) {
    console.error("Error updating category:", error);
    return { success: false, error: "Failed to update category" };
  }
}

export async function deleteCategory(id: string) {
  try {
    if (!id) return;

    await prisma.category.delete({
      where: { id }
    });

    revalidatePath("/dashboard/manage-categories");
    return { success: true }
  } catch (error) {
    console.error("Failed to delete category", error);
    throw new Error("Failed to delete category")
  }
}

export async function getAllCategories() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: {
        createdAt: "asc"
      },
    });

    return categories
  } catch (error) {
    console.error("Failed to get all categories.", error);
    throw new Error("Failed to get all categories.");
  }
}
