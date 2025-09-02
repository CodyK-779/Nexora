"use server";

import { prisma } from "@/app/lib/prisma";

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

    return { success: true }
  } catch (error) {
    console.error("Failed to create new category", error);
    throw new Error("Failed to create new category");
  }
}

export async function updateCategory(id: string, name: string, image: string) {
  try {
    const category = await prisma.category.findUnique({
      where: { id }
    });

    if (!category) return;

    if (category.name === name && category.image === image) {
      return { error: "You still haven't made any changes yet." }
    }

    await prisma.category.update({
      where: { id },
      data: {
        name,
        image
      }
    });

    return { success: true };
  } catch (error) {
    console.error("Failed to update category.", error);
    throw new Error("Failed to update category.")
  }
}

export async function deleteCategory(id: string) {
  try {
    if (!id) return;

    await prisma.category.delete({
      where: { id }
    });

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