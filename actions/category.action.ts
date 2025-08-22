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
    throw new Error("Failed to create new category")
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