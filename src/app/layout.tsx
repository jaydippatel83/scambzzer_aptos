import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AptosWalletProvider } from "./providers";
import "@aptos-labs/wallet-adapter-ant-design/dist/index.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ScamBuzzer",
  description: "ScamBuzzer is a platform that helps you detect, alert, and protect crypto users from scams.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased dark`}
      >
        <AptosWalletProvider>
          {children}
        </AptosWalletProvider>
      </body>
    </html>
  );
}
