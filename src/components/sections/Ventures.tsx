"use client";

import { MouseEvent } from "react";
import { Rocket } from "lucide-react";
import { motion, useReducedMotion, useMotionValue, useMotionTemplate, type Variants } from "framer-motion";

import { SectionHeading } from "@/components/SectionHeading";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ventures } from "@/content/ventures";
import { cn } from "@/lib/utils";

function VentureCard({ venture, shouldReduceMotion }: { venture: any; shouldReduceMotion: boolean | null }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    if (shouldReduceMotion) return;
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      className="group relative flex h-full flex-col rounded-2xl"
      onMouseMove={handleMouseMove}
    >
      {/* Spotlight Hover Glow (Disabled if reduced motion is active) */}
      {!shouldReduceMotion && (
        <motion.div
          className="pointer-events-none absolute -inset-px z-0 rounded-2xl opacity-0 transition duration-500 group-hover:opacity-100"
          style={{
            background: useMotionTemplate`
              radial-gradient(
                600px circle at ${mouseX}px ${mouseY}px,
                var(--accent) 0%,
                transparent 40%
              )
            `,
          }}
        />
      )}

      {/* Main Card Content */}
      <Card
        className={cn(
          "relative z-10 flex h-full flex-col gap-3 rounded-[15px] border-none bg-[var(--surface)] transition-all duration-300",
          "ring-1 ring-[var(--text-secondary)]/15 group-hover:ring-[var(--text-secondary)]/30",
          !shouldReduceMotion && "group-hover:ring-transparent" // Let the spotlight form the ring
        )}
      >
        <CardHeader className="gap-2">
          <div className="flex items-start justify-between gap-3">
            <CardTitle className="text-h3 text-[var(--text-primary)]">
              {venture.name}
            </CardTitle>
            {venture.status === "live" ? (
              <Badge className="shrink-0 border-none bg-[var(--accent)] text-[var(--bg)]">
                Live
              </Badge>
            ) : (
              <Badge
                variant="outline"
                className="shrink-0 border-[var(--text-secondary)]/30 text-[var(--text-secondary)]"
              >
                Coming Soon
              </Badge>
            )}
          </div>
          <p className="text-small font-medium text-[var(--text-secondary)]">
            {venture.tagline}
          </p>
        </CardHeader>
        <CardContent>
          <p className="text-small text-[var(--text-secondary)]">
            {venture.description}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

export function Ventures() {
  const shouldReduceMotion = useReducedMotion();

  const container: Variants = {
    hidden: {},
    show: {
      transition: { staggerChildren: shouldReduceMotion ? 0 : 0.12 },
    },
  };

  const item: Variants = {
    hidden: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.01 : 0.5,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <section id="ventures">
      <SectionHeading
        eyebrow="What we're building"
        eyebrowIcon={Rocket}
        title="Ventures"
        subtitle="A growing portfolio of companies we're designing, launching, and growing from the ground up."
      />

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {ventures.map((venture) => (
          <motion.div key={venture.name} variants={item}>
            <VentureCard venture={venture} shouldReduceMotion={shouldReduceMotion} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
