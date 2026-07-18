"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";

import { Button } from "@/components/ui/button";

function HeroBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div
        className="motion-safe:animate-hero-blob-a absolute -top-24 -left-24 h-[28rem] w-[28rem] rounded-full bg-[var(--accent)] opacity-20 blur-[100px]"
      />
      <div
        className="motion-safe:animate-hero-blob-b absolute -right-24 -bottom-24 h-[24rem] w-[24rem] rounded-full bg-[var(--accent)] opacity-20 blur-[100px]"
      />
      <svg
        className="motion-safe:animate-hero-delta absolute top-1/2 left-1/2 h-[38rem] w-[38rem] -translate-x-1/2 -translate-y-1/2 text-[var(--accent)] opacity-[0.06]"
        viewBox="0 0 100 100"
        fill="none"
      >
        <path d="M50 8 L92 90 L8 90 Z" stroke="currentColor" strokeWidth="1" />
      </svg>
    </div>
  );
}

export function Hero() {
  const shouldReduceMotion = useReducedMotion();

  const container: Variants = {
    hidden: {},
    show: {
      transition: { staggerChildren: shouldReduceMotion ? 0 : 0.15 },
    },
  };

  const item: Variants = {
    hidden: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.01 : 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <section
      id="top"
      className="relative flex min-h-[calc(100svh-4rem)] flex-col items-center justify-center overflow-hidden px-4 py-24 text-center sm:px-6 lg:px-8"
    >
      <HeroBackground />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 flex max-w-3xl flex-col items-center gap-6"
      >
        <motion.h1
          variants={item}
          className="text-display text-[var(--text-primary)]"
        >
          Building what comes next.
        </motion.h1>
        <motion.p
          variants={item}
          className="max-w-xl text-h3 text-[var(--text-secondary)]"
        >
          RK Delta is a venture studio designing, launching, and growing a
          portfolio of ambitious new companies.
        </motion.p>
        <motion.div
          variants={item}
          className="mt-2 flex flex-col items-center gap-4 sm:flex-row"
        >
          <Button asChild size="lg">
            <a href="#ventures">Explore Ventures</a>
          </Button>
          <a
            href="#feedback"
            className="text-body text-[var(--text-secondary)] underline-offset-4 transition-colors duration-200 hover:text-[var(--accent)] hover:underline"
          >
            Share feedback
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
