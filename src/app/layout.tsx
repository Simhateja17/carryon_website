import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CarryOn — Fleet Management",
  description: "Fleet dispatch and logistics management platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={{ height: '100%' }}>
      <body suppressHydrationWarning style={{ minHeight: '100%', margin: 0 }}>{children}</body>
    </html>
  );
}
