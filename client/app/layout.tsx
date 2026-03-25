import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  title: {
    default: "Kaamgar - Find Trusted Local Professionals in Minutes",
    template: "%s | Kaamgar",
  },
  description: "Kaamgar is India's most reliable platform connecting skilled local professionals like electricians, plumbers, and carpenters with customers who need quick, secure services.",
  applicationName: "Kaamgar",
  keywords: [
    "home services",
    "electrician",
    "plumber",
    "carpenter",
    "painter",
    "cleaning",
    "local professionals",
    "kaamgar",
    "hire experts online",
    "home maintenance",
    "service provider"
  ],
  authors: [{ name: "Kaamgar Team" }],
  creator: "Kaamgar Team",
  publisher: "Kaamgar",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/",
    title: "Kaamgar - Find Trusted Local Professionals in Minutes",
    description: "Connect with verified local experts for your home service needs securely and instantly.",
    siteName: "Kaamgar",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Kaamgar Platform Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kaamgar - Find Trusted Local Professionals in Minutes",
    description: "Connect with verified local experts for your home service needs securely and instantly.",
    images: ["/logo.png"],
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
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

import QueryProvider from "@/components/providers/query-provider";
import { Toaster } from "sonner";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QueryProvider>
          {children}
          <Toaster position="top-center" richColors />
        </QueryProvider>
      </body>
    </html>
  );
}
