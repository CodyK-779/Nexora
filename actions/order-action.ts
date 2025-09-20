"use server";

import { prisma } from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";

export async function addNewAddress(userId: string, title: string, street: string, city: string, state: string, postal: string, country: string) {
  try {
    const existingAddress = await prisma.address.findFirst({
      where: { userId, title }
    });

    if (existingAddress) {
      return { success: false, error: "You already have an address with this title" };
    }

    await prisma.address.create({
      data: {
        userId,
        title,
        street,
        city,
        state,
        country,
        postalCode: postal
      }
    });

    revalidatePath("/address");
    return { success: true }
  } catch (error) {
    console.error("Failed to create new Address", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Failed to create new Address" 
    };
  }
}

export async function getSavedAddress(userId: string) {
  try {
    const addresses = await prisma.address.findMany({
      where: { userId }
    });

    return addresses;
  } catch (error) {
    console.error("Failed to get saved addresses", error);
    throw new Error("Failed to get saved addresses");
  }
}
