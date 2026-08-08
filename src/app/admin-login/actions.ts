"use server";

import { cookies } from "next/headers";

export async function loginAction(password: string) {
  // Use env variable or default to admin123 for demo
  const validPassword = process.env.ADMIN_PASSWORD || "admin123";

  if (password === validPassword) {
    // Set a secure HTTP-only cookie
    (await cookies()).set("admin_token", "authenticated", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
    });
    return { success: true };
  }

  return { success: false, error: "Incorrect password." };
}
