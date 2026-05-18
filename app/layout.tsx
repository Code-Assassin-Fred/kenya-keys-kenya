import type { Metadata } from "next";
import { Geist, Geist_Mono, Outfit, Playfair_Display, Oswald } from "next/font/google";
import "./globals.css";
import Chatbot from "@/components/Chatbot";
import { headers } from "next/headers";

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kenya Keys | Unlocking Potential Through Education",
  description: "A grassroots NGO dedicated to sponsoring high-achieving students in rural Kenya, removing barriers to education and building local leadership.",
  icons: {
    icon: "/Kenya Keys Logo With Background.png",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") || "";
  const isBlockedPage = pathname === "/blocked";

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${outfit.variable} ${playfair.variable} ${oswald.variable} font-outfit antialiased`}
      >
        {children}
        {!isBlockedPage && <Chatbot />}
      </body>
    </html>
  );
}
