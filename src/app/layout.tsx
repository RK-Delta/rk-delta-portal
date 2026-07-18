import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { NotificationProvider } from "@/components/NotificationProvider";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "RK Delta",
    template: "%s | RK Delta",
  },
  description:
    "RK Delta is a venture studio launching new companies, products, and ideas.",
  openGraph: {
    title: "RK Delta",
    description:
      "RK Delta is a venture studio launching new companies, products, and ideas.",
    siteName: "RK Delta",
    type: "website",
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
            <main className="flex-1">{children}</main>
            <Footer />
          </NotificationProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
