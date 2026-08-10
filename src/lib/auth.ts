import { cookies } from "next/headers";

export async function requireAuth() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token");
  
  if (!token || token.value !== "authenticated") {
    throw new Error("Unauthorized access. Admin token missing or invalid.");
  }
}
