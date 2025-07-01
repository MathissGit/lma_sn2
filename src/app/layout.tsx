import "@/styles/globals.css";
import LoginPage from "./login/page";
import { PlayerProvider } from "../context/PlayerContext";
import { createClient } from "@/utils/supabase/server";
import { Metadata } from "next";
import ClientLayout from "./ClientLayout"; // <-- nouvel import

export const metadata: Metadata = {
  title: "WeScrap.mp3",
  description: "WeScrap.mp3",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isAuthenticated = !!user;

  return (
    <html lang="fr">
      <body className="min-h-screen bg-[#121212] text-white overflow-hidden">
        {isAuthenticated ? (
          <PlayerProvider>
            <ClientLayout>{children}</ClientLayout>
          </PlayerProvider>
        ) : (
          <LoginPage />
        )}
      </body>
    </html>
  );
}
