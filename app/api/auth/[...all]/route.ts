// export const dynamic = "force-dynamic";

// import { auth } from "@/app/lib/auth";
// import { toNextJsHandler } from "better-auth/next-js";
 
// export const { POST, GET } = toNextJsHandler(auth);

import { auth } from "@/app/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

let handlers;
try {
  handlers = toNextJsHandler(auth);
} catch (err) {
  console.error("Better Auth handler error:", err);
  throw err;
}

export const { GET, POST } = handlers;
