import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { NotificationProvider } from "@/components/NotificationProvider";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageTransition } from "@/components/PageTransition";
import { MobileBottomNav } from "@/components/MobileBottomNav";
import { FixedIcons } from "@/components/sections/FixedIcons";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://rk-delta-portal.vercel.app/"
  ),
  title: {
    default: "RK Delta",
    template: "%s | RK Delta",
  },
  description:
    "RK Delta is a venture studio designing, launching, and growing a portfolio of ambitious new companies.",
  openGraph: {
    title: "RK Delta",
    description:
      "RK Delta is a venture studio designing, launching, and growing a portfolio of ambitious new companies.",
    siteName: "RK Delta",
    type: "website",
    url: "/",
    images: [
      {
        url: "/og-image.png", // Add your OG image to the public folder
        width: 1200,
        height: 630,
        alt: "RK Delta - Venture Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "RK Delta",
    description:
      "RK Delta is a venture studio designing, launching, and growing a portfolio of ambitious new companies.",
    images: ["/og-image.png"], // Add your OG image to the public folder
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NotificationProvider>
            <Navbar />
            <FixedIcons />
            <main className="flex-1 flex flex-col">
              <PageTransition>{children}</PageTransition>
            </main>
            <Footer />
            <MobileBottomNav />
          </NotificationProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
