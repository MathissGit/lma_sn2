"use client";

import { useState } from "react";
import "@/styles/globals.css";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import TerminalComponent from "@/components/Terminal";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [link, setLink] = useState("");

  const handleLinkSubmit = (submittedLink: string) => {
    setLink(submittedLink);
  };

  return (
    <html lang="en">
      <body className="min-h-screen bg-[#121212] text-white overflow-hidden">
        <Header onSubmit={handleLinkSubmit} />

        <Sidebar />

        <div className="ml-[120px] mt-24 mb-24 h-[calc(100vh-96px-96px)] flex gap-4">
          <main className="flex-[0.65] h-full overflow-auto">
            <div className="bg-[#1e1e1e] rounded-xl shadow-lg p-8 w-full h-full">
              {children}
            </div>
          </main>

          <section className="flex-[0.35] h-full overflow-auto">
            <div className="bg-[#1e1e1e] rounded-xl shadow-lg p-8 w-full h-full">
              <TerminalComponent link={link} />
            </div>
          </section>
        </div>

        <Footer />
      </body>
    </html>
  );
}

