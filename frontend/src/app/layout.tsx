import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AnimatePresence } from "framer-motion";
import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import { NextAuthProvider } from "@/providers/NextAuthProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Magpie App",
  description: "Magpie App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-hidden`}
      >
        <NextAuthProvider>
          <Theme>
            <AnimatePresence mode="wait">
              {children}
            </AnimatePresence>
          </Theme>
        </NextAuthProvider>
      </body>
    </html>
  );
}
