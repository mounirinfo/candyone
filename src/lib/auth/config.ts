// lib/auth/config.ts
export const PROTECTED_PATHS = [
  "/dashboard",
  "/settings",
  "/billing",
  "/coach",
] as const;

export type ProtectedPath = typeof PROTECTED_PATHS[number];
export const PROTECTED_PREFIXES = ["/dashboard", "/coach"] as const;

