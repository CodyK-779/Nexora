"use server";

import { auth } from "@/app/lib/auth";
import { prisma } from "@/app/lib/prisma";
import { headers } from "next/headers";

export async function getAllUsers() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        image: true,
        email: true,
        role: true,
        createdAt: true
      }
    });

    return users;
  } catch (error) {
    console.error("Failed to get Users", error);
    throw new Error("Failed to get Users");
  }
}

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
    throw new Error("Failed to get user details");
  }
}

export async function changeRole(userId: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!user) {
      return { error: "This user doesn't exist" }
    };

    const updatedRole = user.role === "USER" ? "ADMIN" : "USER";

    await prisma.user.update({
      where: { id: userId },
      data: {
        role: updatedRole
      }
    });

    return { success: true };
  } catch (error) {
    console.error("Failed to change user role", error);
    throw new Error("Failed to change user role");
  }
}

export async function deleteUser(id: string) {
  try {
    if (!id) return;

    await prisma.user.delete({
      where: { id }
    });

    return { success: true };
  } catch (error) {
    console.error("Failed to delete user", error);
    throw new Error("Failed to delete user");
  }
}