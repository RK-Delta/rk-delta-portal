"use client";

import { MessageSquare } from "lucide-react";

import { SectionHeading } from "@/components/SectionHeading";
import { FeedbackForm } from "@/components/sections/FeedbackForm";

export function Feedback() {
  return (
    <section id="feedback">
      <SectionHeading
        eyebrow="We're listening"
        eyebrowIcon={MessageSquare}
        title="Feedback"
        subtitle="Questions, ideas, or just want to say hello — we read every submission."
      />
      <div className="mt-8">
        <FeedbackForm />
      </div>
    </section>
  );
}
