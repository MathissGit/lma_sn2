import type { Metadata } from "next";
import "@/styles/globals.css";


export const metadata: Metadata = {
  title: "WeScrap.mp3",
  description: "WeScrap.mp3",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className= "antialiased"
      >
        {children}
      </body>
    </html>
  );
}
