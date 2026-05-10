import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import EditorialLayout from "@/components/layout/EditorialLayout";
import { Toaster } from "sonner";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Traveloop | Luxury AI Travel Experience",
  description: "Plan elegant, unforgettable journeys with AI-powered storytelling.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased selection:bg-red-50 selection:text-white bg-[#FDFBF7] dark:bg-black transition-colors duration-500">
        <EditorialLayout>{children}</EditorialLayout>
        <Toaster />
      </body>
    </html>
  );
}
