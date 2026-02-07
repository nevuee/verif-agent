import type { Metadata, Viewport } from "next";

import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from '@/components/ScrollToTop';
import { Providers } from './providers';
import '@rainbow-me/rainbowkit/styles.css';



export const viewport: Viewport = {
  themeColor: "#171717",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: "0xVRE | Proof-of-Reasoning Layer",
  description: "The accountability layer for autonomous AI agents. Verify reasoning execution with ZK-SNARKs.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "0xVRE",
  },
  icons: {
    icon: "/favicon-whatsapp.jpeg",
    shortcut: "/favicon-whatsapp.jpeg",
    apple: "/favicon-whatsapp.jpeg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="antialiased"
      >
        <Providers>
          <Navbar />
          {children}
          <Footer />
          <ScrollToTop />
        </Providers>
      </body>
    </html>
  );
}
