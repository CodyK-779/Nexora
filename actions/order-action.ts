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

export async function setDefaultAddress(userId: string, addressId: string, path: string) {
  try {
    await prisma.$transaction([
      prisma.address.updateMany({
        where: { userId },
        data: { isDefault: false }
      }),

      prisma.address.update({
        where: { id: addressId },
        data: { isDefault: true }
      })
    ])

    revalidatePath(path);
    return { success: true }
  } catch (error) {
    console.error("Failed set Default Address", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Failed to set default address" 
    };
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

      ...cart.cartItem.map(item => 
        prisma.product.update({
          where: { id: item.product.id },
          data: {
            inventory: {
              decrement: item.quantity
            }
          }
        })
      ),

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

export async function getAllOrders() {
  try {
    const orders = await prisma.order.findMany({
      include: {
        user: true,
        address: true,
        orderItem: {
          include: {
            product: true
          }
        }
      }
    });

    return orders;
  } catch (error) {
    console.error("Failed to get all orders", error);
    throw new Error("Failed to get all orders");
  }
}

export async function updateAddress(id: string, formData: FormData, path: string) {
  try {
    const title = formData.get("title") as string;
    const street = formData.get("street") as string;
    const city = formData.get("city") as string;
    const state = formData.get("state") as string;
    const postalCode = formData.get("postalCode") as string;
    const country = formData.get("country") as string;

    await prisma.address.update({
      where: { id },
      data: {
        title,
        street,
        city,
        state,
        postalCode,
        country
      }
    });

    revalidatePath(path);
    return { success: true }
  } catch (error) {
    console.error("Failed to update address", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Failed to update address" 
    };
  }
}