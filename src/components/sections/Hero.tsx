"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";

import { Button } from "@/components/ui/button";
import { GrowthConstellation } from "@/components/GrowthConstellation";
import { cn } from "@/lib/utils";

const GRAIN_SVG =
  '<svg xmlns="http://www.w3.org/2000/svg" width="140" height="140"><filter id="grain"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/></filter><rect width="100%" height="100%" filter="url(#grain)"/></svg>';
export const GRAIN_DATA_URI = `url("data:image/svg+xml,${encodeURIComponent(GRAIN_SVG)}")`;

import { BorderSweep } from "@/components/BorderSweep";

function HeroBackground({ shouldReduceMotion }: { shouldReduceMotion: boolean | null }) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <BorderSweep shouldReduceMotion={shouldReduceMotion} />
      
      <div
        className="motion-safe:animate-hero-blob-a absolute -top-24 -left-24 h-[28rem] w-[28rem] rounded-full bg-[var(--accent)] opacity-20 blur-[100px]"
      />
      <div
        className="motion-safe:animate-hero-blob-b absolute -right-24 -bottom-24 h-[24rem] w-[24rem] rounded-full bg-[var(--accent)] opacity-20 blur-[100px]"
      />
      <GrowthConstellation />
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
      <HeroBackground shouldReduceMotion={shouldReduceMotion} />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 flex max-w-3xl flex-col items-center gap-6"
      >
        <motion.h1
         style={{"fontSize":"3.5rem", "fontWeight": "700"}}
          variants={item}
          className={cn(
            "text-display text-[var(--text-primary)]",
            "motion-safe:animate-hero-headline-sheen bg-gradient-to-r from-[var(--text-primary)] from-42% via-[var(--accent)] via-50% to-[var(--text-primary)] to-58% bg-[length:300%_100%] bg-clip-text text-transparent",
          )}
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
