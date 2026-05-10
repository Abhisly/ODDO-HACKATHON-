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
      <body className="font-sans bg-background text-foreground antialiased selection:bg-luxury-forest selection:text-white">
        <EditorialLayout>{children}</EditorialLayout>
        <Toaster />
      </body>
    </html>
  );
}
