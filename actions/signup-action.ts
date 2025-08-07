"use server";

import { auth, ErrorCode } from "@/app/lib/auth";
import { APIError } from "better-auth/api";

const SignUpAction = async (name: string, email: string, password: string) => {
  try {
    await auth.api.signUpEmail({
      body: {
        name,
        email,
        password
      }
    })
  } catch (error) {
    if (error instanceof APIError) {
      const errcode = error.body ? (error.body.code as ErrorCode) : "UNKNOWN";

      if (errcode) return { error: error.message };
    }

    return { error: "Internal server error" };
  }

  return { error: null };
}

export default SignUpAction;