import type { Metadata } from "next";
import "@/styles/globals.css";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Terminal from "@/components/Terminal";

export const metadata: Metadata = {
  title: "WeScrap.mp3",
  description: "WeScrap.mp3",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#121212] text-white overflow-hidden">
        <Header />

        <Sidebar />

        <div className="ml-[120px] mt-24 mb-24 h-[calc(100vh-96px-96px)] flex gap-4">
          <main className="flex-[0.65] h-full overflow-auto">
            <div className="bg-[#1e1e1e] rounded-xl shadow-lg p-8 w-full h-full">
              {children}
            </div>
          </main>

          <section className="flex-[0.35] h-full overflow-auto">
            <div className="bg-[#1e1e1e] rounded-xl shadow-lg p-8 w-full h-full">
              <Terminal />
            </div>
          </section>
        </div>

        <Footer />
      </body>
    </html>
  );
}

