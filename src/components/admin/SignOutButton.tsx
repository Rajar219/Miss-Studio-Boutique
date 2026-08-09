"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

export default function SignOutButton() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleSignOut = () => {
    startTransition(async () => {
      // Clear cookie by setting it to expire
      document.cookie = "admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
      router.push("/admin-login");
      router.refresh();
    });
  };

  return (
    <button 
      onClick={handleSignOut}
      disabled={isPending}
      className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-500 hover:bg-red-50 hover:text-red-600 transition-colors w-full group disabled:opacity-50"
    >
      <LogOut size={20} className="text-gray-400 group-hover:text-red-500 transition-colors" />
      <span className="font-medium">{isPending ? "Signing out..." : "Sign Out"}</span>
    </button>
  );
}
