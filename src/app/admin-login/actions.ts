"use server";

import { cookies } from "next/headers";

export async function loginAction(password: string) {
  const validPassword = process.env.ADMIN_PASSWORD;

  if (!validPassword) {
    return { success: false, error: "Admin password is not configured on the server." };
  }

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

export async function logoutAction() {
  (await cookies()).delete("admin_token");
  return { success: true };
}
