import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import DatabaseProvider from "@/app/db-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "WatermelonDB Next.js Example",
  description: "An example of using WatermelonDB with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <DatabaseProvider>{children}</DatabaseProvider>
      </body>
    </html>
  );
}
