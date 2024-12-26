import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ReactQueryClientProvider } from "@/utils/Provider";
import InventoryProvider from "@/context/inventory/provider";
import AuthProvider from "@/context/auth/provider";
import Navbar from "@/components/molecules/Navbar";
import { Toaster } from "react-hot-toast";
import { ModalProvider } from "@/context/modal";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Inventory Management",
  description: "Lucidity 's Inventory Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReactQueryClientProvider>
          <ReactQueryDevtools />
          <AuthProvider>
            <InventoryProvider>
              <ModalProvider>
                <Toaster />
                <Navbar />
                {children}
              </ModalProvider>
            </InventoryProvider>
          </AuthProvider>
        </ReactQueryClientProvider>
      </body>
    </html>
  );
}
