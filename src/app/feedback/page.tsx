import type { Metadata } from "next";

import { Feedback } from "@/components/sections/Feedback";

export const metadata: Metadata = {
  title: "Feedback",
  description: "Share your thoughts, ideas, or feedback with the RK Delta team.",
  openGraph: {
    title: "Feedback | RK Delta",
    description: "Share your thoughts, ideas, or feedback with the RK Delta team.",
    url: "https://rkdelta.com/feedback",
  },
  alternates: {
    canonical: "/feedback",
  },
};

export default function FeedbackPage() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-2xl">
        <Feedback />
      </div>
    </div>
  );
}
