import type { Metadata } from "next";
import { Geist, Geist_Mono, Outfit, Playfair_Display, Oswald } from "next/font/google";
import "./globals.css";
import Chatbot from "@/components/Chatbot";
import JsonLd, { organizationSchema, websiteSchema } from "@/components/seo/JsonLd";
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
  metadataBase: new URL("https://kenyakeys-pbokenya.org"),
  title: {
    default: "Kenya Keys — Education NGO in Kenya | Sponsor a Student in Rural Kenya",
    template: "%s | Kenya Keys — Education NGO Kenya",
  },
  description: "Kenya Keys is a grassroots education NGO and registered PBO in Kwale County, Kenya. We sponsor high-achieving students in rural Kenya, build schools, and remove barriers to education. Donate to education in Kenya or sponsor a student today.",
  keywords: [
    "Kenya Keys",
    "Kenya Keys PBO Kenya",
    "Kenya Keys NGO",
    "education NGO Kenya",
    "sponsor a student Kenya",
    "donate to education Kenya",
    "education charity Kenya",
    "rural education Kenya",
    "NGO Kenya",
    "education sponsorship Kenya",
    "sponsor a child Kenya",
    "best education NGOs in Kenya",
    "Kwale County education",
    "Taru Kenya NGO",
    "girls education Kenya",
    "donate to children education Kenya",
    "scholarship programs Kenya",
    "student sponsorship Kenya",
    "education nonprofit Kenya",
    "support rural education Kenya",
    "donate to NGO Kenya",
    "education PBO Kenya",
    "Coast Kenya education",
    "Mombasa education NGO",
  ],
  authors: [{ name: "Kenya Keys", url: "https://kenyakeys-pbokenya.org" }],
  creator: "Kenya Keys PBO Kenya",
  publisher: "Kenya Keys",
  icons: {
    icon: "/Kenya Keys Logo With Background.webp",
    apple: "/Kenya Keys Logo With Background.webp",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://kenyakeys-pbokenya.org",
    siteName: "Kenya Keys — Education NGO Kenya",
    title: "Kenya Keys — Education NGO in Kenya | Sponsor a Student",
    description: "Kenya Keys is a grassroots education NGO in Kenya. We sponsor high-achieving students, build schools, and remove barriers to education in rural Kwale County. Donate or sponsor a student today.",
    images: [
      {
        url: "/Kenya Keys Logo With Background.webp",
        width: 512,
        height: 512,
        alt: "Kenya Keys — Education NGO in Kenya Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kenya Keys — Education NGO in Kenya | Sponsor a Student",
    description: "Kenya Keys sponsors high-achieving students in rural Kenya. Donate to education in Kenya or sponsor a student today.",
    images: ["/Kenya Keys Logo With Background.webp"],
    creator: "@KenyaKeys_Kenya",
    site: "@KenyaKeys_Kenya",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://kenyakeys-pbokenya.org",
  },
  category: "education",
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
      <head>
        <JsonLd data={organizationSchema} />
        <JsonLd data={websiteSchema} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${outfit.variable} ${playfair.variable} ${oswald.variable} font-outfit antialiased overflow-x-hidden`}
      >
        {children}
        {!isBlockedPage && <Chatbot />}
      </body>
    </html>
  );
}
