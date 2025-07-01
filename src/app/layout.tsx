"use client";

import { useState } from "react";
import "@/styles/globals.css";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import TerminalComponent from "@/components/Terminal";
import LoginPage from "./login/page";
import { PlayerProvider } from "../context/PlayerContext";
import { createClient } from "@/utils/supabase/server";
import { Metadata } from "next";

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

  // Ces hooks ne peuvent pas être utilisés ici (composant async)
  // Ils doivent être placés dans un composant client imbriqué
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

// Composant séparé pour les hooks côté client
function ClientLayout({ children }: { children: React.ReactNode }) {
  const [reloadKey, setReloadKey] = useState(0);
  const [link, setLink] = useState("");

  const handleLinkSubmit = (submittedLink: string) => {
    setLink(submittedLink);
  };

  const reloadChildren = () => {
    setReloadKey((prevKey) => prevKey + 1);
  };

  return (
    <>
      <Header onSubmit={handleLinkSubmit} />
      <Sidebar />
      <div className="ml-[120px] mt-24 mb-24 h-[calc(100vh-96px-96px)] flex gap-5">
        <main className="flex-[0.65] h-full overflow-auto">
          <div className="bg-[#1e1e1e] rounded-xl shadow-lg p-8 w-full h-full">
            <div key={reloadKey}>{children}</div>
          </div>
        </main>
        <section className="flex-[0.35] h-full overflow-auto mr-4">
          <div className="bg-[#1e1e1e] rounded-xl shadow-lg p-8 w-full h-full">
            <TerminalComponent link={link} onReload={reloadChildren} />
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
