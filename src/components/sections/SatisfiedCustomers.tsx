"use client";

import Image from "next/image";
import { Star, MessageSquareQuote } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import { useRef, useState } from "react";

import { SectionHeading } from "@/components/SectionHeading";
import { cn } from "@/lib/utils";

type Testimonial = {
  id: string;
  name: string;
  role: string;
  quote: string;
  avatar?: string;
  rating: number;
  rotation: string; // The subtle tilt for this card
};

const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Dr. Sarah Jenkins",
    role: "Academic Director, Mindenious Edutech",
    quote: "RK Delta completely reimagined how we deliver education. The seamless blend of theory and real-world internships has transformed our students' learning experience.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop",
    rating: 5,
    rotation: "-rotate-2",
  },
  {
    id: "t2",
    name: "Marcus Chen",
    role: "CTO, Mindenious Edutech",
    quote: "The technical architecture they implemented is flawless. Managing thousands of personalized mentorship sessions without a single hiccup is no small feat.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&auto=format&fit=crop",
    rating: 5,
    rotation: "rotate-1",
  },
  {
    id: "t3",
    name: "Muhammad Rizwan",
    role: "Principal, Madarsa Madeenatul Olum",
    quote: "Integrating modern curriculum with traditional Islamic studies seemed challenging, but the digital infrastructure provided made it exceptionally intuitive.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop",
    rating: 5,
    rotation: "-rotate-1",
  },
  {
    id: "t4",
    name: "Tariq Ahmed",
    role: "Head of Operations, Madarsa Madeenatul Olum",
    quote: "From KG to 12th Grade, tracking student progress and managing operations is now completely frictionless. An absolute game changer for our institution.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop",
    rating: 5,
    rotation: "rotate-2",
  },
  {
    id: "t5",
    name: "Aisha Patel",
    role: "Editor in Chief, Daily Links Nepal",
    quote: "News moves fast, and our platform needed to keep up. The new digital portal is blazingly fast and keeps our readers engaged longer than ever.",
    rating: 5,
    rotation: "-rotate-2",
  },
  {
    id: "t6",
    name: "James Wilson",
    role: "Technical Lead, Daily Links Nepal",
    quote: "They understand both deep technical constraints and high-level engagement metrics. A rare combination that saved us months of iteration and scaling issues.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&auto=format&fit=crop",
    rating: 5,
    rotation: "rotate-1",
  },
];

function TestimonialCard({
  testimonial,
  isClone = false,
  shouldReduceMotion,
}: {
  testimonial: Testimonial;
  isClone?: boolean;
  shouldReduceMotion: boolean | null;
}) {
  return (
    <figure
      className={cn(
        "group relative flex w-[300px] shrink-0 flex-col justify-between rounded-2xl border border-[var(--text-secondary)]/15 bg-[var(--surface)] p-6 shadow-sm transition-all duration-300 sm:w-[360px]",
        // Card straightens, lifts, and gets a highlight border on hover or focus-within
        "focus-within:-translate-y-2 focus-within:rotate-0 focus-within:scale-[1.02] focus-within:border-[var(--accent)]/50 focus-within:shadow-md",
        "hover:-translate-y-2 hover:rotate-0 hover:scale-[1.02] hover:border-[var(--accent)]/50 hover:shadow-md",
        !shouldReduceMotion && testimonial.rotation
      )}
      aria-hidden={isClone ? "true" : undefined}
    >
      <blockquote className="relative">
        <MessageSquareQuote className="mb-4 h-6 w-6 text-[var(--accent)]/30 transition-colors group-hover:text-[var(--accent)]/60" aria-hidden="true" />
        <p className="text-body text-[var(--text-primary)]">
          &ldquo;{testimonial.quote}&rdquo;
        </p>
      </blockquote>

      <div className="mt-8 flex items-center justify-between border-t border-[var(--text-secondary)]/15 pt-4">
        <div className="flex items-center gap-3">
          {testimonial.avatar ? (
            <Image
              src={testimonial.avatar}
              alt={testimonial.name}
              width={40}
              height={40}
              className="h-10 w-10 shrink-0 rounded-full object-cover ring-1 ring-[var(--text-secondary)]/20"
              loading="lazy"
            />
          ) : (
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--accent)]/10 ring-1 ring-[var(--accent)]/20">
              <span className="text-small font-semibold text-[var(--accent)]">
                {testimonial.name.charAt(0)}
              </span>
            </div>
          )}
          <div className="flex flex-col">
            <cite className="text-small font-medium text-[var(--text-primary)] not-italic">
              {testimonial.name}
            </cite>
            <span className="text-small text-[var(--text-secondary)]">
              {testimonial.role}
            </span>
          </div>
        </div>

        {testimonial.rating && (
          <div className="flex gap-0.5" aria-label={`Rating: ${testimonial.rating} out of 5 stars`}>
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "h-3.5 w-3.5",
                  i < testimonial.rating
                    ? "fill-[var(--accent)]/50 text-[var(--accent)]"
                    : "fill-[var(--text-secondary)]/20 text-[var(--text-secondary)]/30"
                )}
                aria-hidden="true"
              />
            ))}
          </div>
        )}
      </div>

      {/* Focusable overlay to make the card keyboard accessible */}
      <a
        href="#"
        onClick={(e) => e.preventDefault()}
        className="absolute inset-0 z-10 rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
        aria-label={`Read testimonial from ${testimonial.name}`}
        tabIndex={isClone ? -1 : 0}
      />
    </figure>
  );
}

export function SatisfiedCustomers() {
  const shouldReduceMotion = useReducedMotion();
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  // We use CSS keyframes for smoother SSR-friendly looping, 
  // but we can pause via state/CSS classes on interactions.

  return (
    <section id="testimonials" className="overflow-hidden py-12 sm:py-16 w-full min-w-0">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Trusted partners"
          title="Satisfied Customers"
          subtitle="Don't just take our word for it. Here's what the teams we've partnered with have to say about the work we deliver."
        />
      </div>

      {/* JSON-LD Schema for Reviews */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "RK Delta",
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "5.0",
              "reviewCount": testimonials.length.toString()
            },
            "review": testimonials.map((t) => ({
              "@type": "Review",
              "author": {
                "@type": "Person",
                "name": t.name
              },
              "reviewRating": {
                "@type": "Rating",
                "ratingValue": t.rating.toString(),
                "bestRating": "5"
              },
              "reviewBody": t.quote
            }))
          })
        }}
      />

      {/* overflow-hidden here (in addition to the section) directly clips the w-max track */}
      <div className="relative mt-12 w-full min-w-0 overflow-hidden sm:mt-16">
        {/* Left/Right fading gradients to blend the marquee edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-[var(--bg)] to-transparent sm:w-32" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-[var(--bg)] to-transparent sm:w-32" />

        <div
          className={cn(
            "flex w-[380px] md:w-max",
            !shouldReduceMotion && "hover:[&>div]:[animation-play-state:paused] focus-within:[&>div]:[animation-play-state:paused]",
            // Pause on touch start so mobile users can read/swipe
            isPaused && "[&>div]:[animation-play-state:paused]"
          )}
          onPointerDown={() => setIsPaused(true)}
          onPointerUp={() => setIsPaused(false)}
          onPointerLeave={() => setIsPaused(false)}
        >
          {/* 
            If user prefers reduced motion, we wrap naturally in a grid.
            If not, we run the infinite scrolling marquee.
          */}
          {shouldReduceMotion ? (
            <div className="mx-auto flex max-w-6xl flex-wrap justify-center gap-6 px-4 py-8">
              {testimonials.map((testimonial) => (
                <TestimonialCard
                  key={testimonial.id}
                  testimonial={testimonial}
                  shouldReduceMotion={shouldReduceMotion}
                />
              ))}
            </div>
          ) : (
            <>
              {/* CSS Animation defined locally for seamless infinite scroll */}
              <style>{`
                @keyframes infinite-scroll {
                  0% { transform: translateX(0); }
                  100% { transform: translateX(-100%); }
                }
                .animate-infinite-scroll {
                  animation: infinite-scroll 45s linear infinite;
                }
                @media (max-width: 768px) {
                  .animate-infinite-scroll {
                    animation-duration: 35s;
                  }
                }
              `}</style>

              <div
                ref={scrollerRef}
                className="animate-infinite-scroll flex w-max gap-6 px-3 py-8"
              >
                {testimonials.map((testimonial) => (
                  <TestimonialCard
                    key={testimonial.id}
                    testimonial={testimonial}
                    shouldReduceMotion={shouldReduceMotion}
                  />
                ))}
              </div>
              <div
                className="animate-infinite-scroll flex w-max gap-6 px-3 py-8"
                aria-hidden="true"
              >
                {testimonials.map((testimonial) => (
                  <TestimonialCard
                    key={`${testimonial.id}-clone`}
                    testimonial={testimonial}
                    isClone={true}
                    shouldReduceMotion={shouldReduceMotion}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
