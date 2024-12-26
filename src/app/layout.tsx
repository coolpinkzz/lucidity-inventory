import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ReactQueryClientProvider } from "@/utils/Provider";
import InventoryProvider from "@/context/inventory/provider";
import { ModalManager } from "@/components/organisms/Modal/ModalManager";
import AuthProvider from "@/context/auth/provider";
import Navbar from "@/components/molecules/Navbar";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
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
              <ModalManager />
              <Toaster />
              <Navbar />
              {children}
            </InventoryProvider>
          </AuthProvider>
        </ReactQueryClientProvider>
      </body>
    </html>
  );
}