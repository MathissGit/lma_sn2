"use client";
import { useState } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import TerminalComponent from "@/components/Terminal";
import Footer from "@/components/Footer";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
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