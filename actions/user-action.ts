"use server";

import { auth } from "@/app/lib/auth";
import { prisma } from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";
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

export async function currentUserDetails() {
  try {
    const session = await auth.api.getSession({
      headers: await headers()
    });

    if (!session) return;

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: {
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

    revalidatePath("/dashboard/users");
    return { success: true };
  } catch (error) {
    console.error("Failed to change user role", error);
    throw new Error("Failed to change user role");
  }
}

export async function editUserProfile(id: string, formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const bio = formData.get("bio") as string;
    const image = formData.get("image") as string;

    await prisma.user.update({
      where: { id },
      data: {
        name,
        bio,
        image
      }
    });

    revalidatePath("/dashboard/users");
    return { success: true };
  } catch (error) {
    console.error("Error updating profile:", error);
    return { success: false, error: "Failed to update profile" };
  }
}

export async function deleteUser(id: string) {
  try {
    if (!id) return;

    await prisma.user.delete({
      where: { id }
    });

    revalidatePath("/dashboard/users");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete user", error);
    throw new Error("Failed to delete user");
  }
}

export async function selectedUserDelete(ids: string[]) {
  try {
    if (!ids || ids.length === 0) {
      throw new Error("No user ids provided");
    }

    await prisma.user.deleteMany({
      where: {
        id: {
          in: ids
        }
      }
    });

    revalidatePath("/dashboard/users");
    return { success: true }
  } catch (error) {
    console.error("Error deleting users:", error);
    return { success: false, error: "Failed to delete users" };
  }
}
