import "./globals.css";
import type { Metadata } from "next";
import { ThirdwebProvider } from "thirdweb/react";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Coinbase Smart Wallet",
  description:
    "A demo application of sponsoring transactions with Arbitrum and Coinbase Smart Wallet",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ThirdwebProvider>
        <body className={inter.className}>{children}</body>
      </ThirdwebProvider>
    </html>
  );
}
