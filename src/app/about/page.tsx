import type { Metadata } from "next";

import { About } from "@/components/sections/About";
import { Founders } from "@/components/sections/Founders";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about RK Delta, a venture studio designing, launching, and growing a portfolio of ambitious new companies.",
  openGraph: {
    title: "About | RK Delta",
    description: "Learn about RK Delta, a venture studio designing, launching, and growing a portfolio of ambitious new companies.",
    url: "https://rkdelta.com/about", // Replace with real domain when ready
  },
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-24 px-4 py-24 sm:px-6 lg:px-8">
      <About />
      <Founders />
    </div>
  );
}
