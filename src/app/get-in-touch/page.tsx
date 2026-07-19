import type { Metadata } from "next";

import { Contact } from "@/components/sections/Contact";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with RK Delta. Whether you have a project idea, feedback, or want to explore a partnership, we'd love to hear from you.",
  openGraph: {
    title: "Get in Touch | RK Delta",
    description: "Get in touch with RK Delta. Whether you have a project idea, feedback, or want to explore a partnership, we'd love to hear from you.",
    url: "https://rkdelta.com/get-in-touch",
  },
  alternates: {
    canonical: "/get-in-touch",
  },
};

export default function ContactPage() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-2xl">
        <Contact />
      </div>
    </div>
  );
}
