"use server";

import { auth } from "@/app/lib/auth";
import { prisma } from "@/app/lib/prisma";
import { headers } from "next/headers";

export async function getUserDetails(userId: string) {
  try {
    const session = await auth.api.getSession({
      headers: await headers()
    });

    if (!session) return;
    if (session.user.id !== userId) return;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        cart: true,
        order: true,
        wishList: true
      }
    });

    return user;
  } catch (error) {
    console.error("Failed to get user details", error);
    throw new Error("Failed to get user details")
  }
}