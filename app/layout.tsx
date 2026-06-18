import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Recall - Active Recall & Spaced Repetition",
  description:
    "Study smarter with active recall and spaced repetition powered by FSRS. Track decks, cards, reviews and retention.",
  generator: "Me! Kai Nguyễn",
  icons: {
    icon: [
      {
        url: "/icons/brain-svgrepo-com.svg",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icons/brain-svgrepo-com.svg",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icons/brain-svgrepo-com.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/icons/brain-svgrepo-com.svg",
  },
};

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#1a1d1c",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} bg-background`}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  );
}
