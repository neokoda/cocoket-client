import type { Metadata } from "next";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "Cocoket",
  description: "Aplikasi Marketplace untuk Optimalisasi Pengelolaan Limbah Kelapa dan Produksi Briket",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-cckGreen">{children}</body>
    </html>
  );
}
