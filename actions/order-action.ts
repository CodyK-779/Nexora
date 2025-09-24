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

export async function createOrder(userId: string, addressId: string, total: number, path: string) {
  try {
    const cart = await prisma.cart.findUnique({
      where: { userId },
      include: {
        cartItem: {
          include: {
            product: true
          }
        }
      }
    });

    if (!cart || cart.cartItem.length === 0) {
      return { success: false, error: "Cart is empty" }
    }

    await prisma.$transaction([
      prisma.order.create({
        data: {
          userId,
          addressId,
          total,
          orderItem: {
            create: cart.cartItem.map(item => ({
              productId: item.product.id,
              quantity: item.quantity,
              price: item.product.price
            }))
          }
        }
      }),
      prisma.cartItem.deleteMany({
        where: { cardId: cart.id }
      })
    ]);

    revalidatePath(path);
    return { success: true }
  } catch (error) {
    console.error("Error creating order:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to create order",
    };
  }
}
