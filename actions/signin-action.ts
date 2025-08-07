"use server";

import { auth, ErrorCode } from "@/app/lib/auth";
import { APIError } from "better-auth/api";

const SignInAction = async (email: string, password: string) => {
  try {
    await auth.api.signInEmail({
      body: {
        email,
        password
      }
    });
  } catch (error) {
    if (error instanceof APIError) {
      const errcode = error.body ? (error.body.code as ErrorCode) : "UNKNOWN";

      if (errcode) return { error: error.message };
    }

    return { error: "Internal server error" };
  }

  return { error: null };
}

export default SignInAction;