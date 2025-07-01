"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/clients";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        router.replace("/"); 
        router.refresh();
      }
    });
  }, [router, supabase]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (!error) {
      await router.replace("/"); // Redirige et remplace l'URL
      router.refresh();          // Force la mise à jour côté serveur
    } else {
      alert("Login failed: " + error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#03DAC6] to-black text-white">
      <form
        onSubmit={handleLogin}
        className="bg-[#191414] p-10 rounded-xl shadow-xl space-y-6 w-full max-w-sm"
      >
        <h1 className="text-3xl font-bold text-center">WeScrap.mp3</h1>
        <div>
          <label htmlFor="email" className="block text-sm mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="w-full p-2 rounded bg-[#121212] border border-[#282828]"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm mb-1">
            Password
          </label>
          <input
            id="password"
            type="password"
            className="w-full p-2 rounded bg-[#121212] border border-[#282828]"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-[#254943] hover:bg-[#39635c] p-2 w-full rounded font-semibold"
        >
          Log in
        </button>
      </form>
    </div>
  );
}
