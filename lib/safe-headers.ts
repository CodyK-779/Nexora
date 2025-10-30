let cachedHeaders: Headers | null = null;

export async function getSafeHeaders() {
  if (cachedHeaders) return cachedHeaders;

  try {
    const { headers } = await import("next/headers");
    cachedHeaders = await headers();
  } catch {
    cachedHeaders = new Headers();
  }

  return cachedHeaders;
}
