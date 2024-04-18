"use client";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { UserProvider } from "@/context/UserContext";
import Header from "@/components/Header";
import { usePathname } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { pathname } = usePathname() as any;
  return (
    <html lang="en">
      <body className={inter.className}>
        <UserProvider>
          {pathname !== "/sign-in" || (pathname !== "/" && <Header />)}
          <main>{children}</main>
        </UserProvider>
      </body>
    </html>
  );
}
