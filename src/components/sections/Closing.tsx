"use client";

import { motion, useReducedMotion } from "framer-motion";

import { BorderSweep } from "@/components/BorderSweep";
import { Button } from "@/components/ui/button";

export function Closing() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative flex flex-col items-center justify-center overflow-hidden px-4 py-32 text-center sm:px-6 lg:px-8">
      {/* The border sweep frames the top of this final section, mirroring the hero */}
      <BorderSweep shouldReduceMotion={shouldReduceMotion} />

      <motion.div
        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
        whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 mx-auto flex max-w-3xl flex-col items-center gap-6"
      >
        <h2 className="text-display text-[var(--text-primary)] motion-safe:animate-hero-headline-sheen bg-gradient-to-r from-[var(--text-primary)] from-42% via-[var(--accent)] via-50% to-[var(--text-primary)] to-58% bg-[length:300%_100%] bg-clip-text text-transparent">
          And this is just the beginning.
        </h2>
        
        <p className="max-w-xl text-h3 text-[var(--text-secondary)]">
          Join us on the journey as we build what comes next.
        </p>
        
        <div className="mt-4">
          <Button asChild size="lg" className="bg-[var(--accent)] text-[var(--bg)] hover:bg-[var(--accent)]/90">
            <a href="#feedback">Get notified</a>
          </Button>
        </div>
      </motion.div>
    </section>
  );
}
