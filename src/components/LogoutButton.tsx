"use client";

import { createClient } from "@/utils/supabase/clients";
import { LogOutIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const supabase = createClient();
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  return (
    <button className="relative group bg-[#bd4242] p-2 rounded-full transition-colors" onClick={handleLogout}>
        <LogOutIcon
            size={24}
            className="text-white group-hover:text-[#03DAC6] transition-colors"
        />
    </button>
  );
}
