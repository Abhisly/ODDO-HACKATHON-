import type { Metadata } from "next";
import "./globals.css";
import SpatialLayout from "@/components/layout/SpatialLayout";

export const metadata: Metadata = {
  title: "Traveloop OS | Cinematic AI Travel OS",
  description: "Futuristic AI Travel Operating System from 2045",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[#050505]">
        <SpatialLayout>{children}</SpatialLayout>
      </body>
    </html>
  );
}
