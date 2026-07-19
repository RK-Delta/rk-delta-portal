"use client";

import {
  Code2,
  HandCoins,
  Layers,
  LineChart,
  Rocket,
  Settings2,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { MouseEvent } from "react";
import { motion, useReducedMotion, useMotionValue, useMotionTemplate } from "framer-motion";

import { SectionHeading } from "@/components/SectionHeading";
import { services } from "@/content/services";
import { staggerContainerVariants, staggerItemVariants } from "@/lib/motion-variants";
import { cn } from "@/lib/utils";

const ICONS: Record<string, LucideIcon> = {
  Rocket,
  Sparkles,
  Code2,
  LineChart,
  HandCoins,
  Settings2,
};

function ServiceCard({ service, shouldReduceMotion }: { service: any; shouldReduceMotion: boolean | null }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    if (shouldReduceMotion) return;
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }
  
  const Icon = ICONS[service.icon];

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
      <div className={cn(
        "relative z-10 flex h-full flex-col rounded-[15px] p-6 bg-[var(--surface)] transition-all duration-300",
        "ring-1 ring-[var(--text-secondary)]/15 group-hover:ring-[var(--text-secondary)]/30",
        !shouldReduceMotion && "group-hover:ring-transparent" // Let the spotlight form the ring
      )}>
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[var(--accent)]/10">
          {Icon && (
            <Icon
              className="h-5 w-5 text-[var(--accent)]"
              aria-hidden="true"
            />
          )}
        </div>
        <div className="mt-6 flex-1">
          <h3 className="text-h3 text-[var(--text-primary)]">
            {service.title}
          </h3>
          <p className="mt-3 text-small text-[var(--text-secondary)]">
            {service.description}
          </p>
        </div>
      </div>
    </div>
  );
}

export function Services() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="services">
      <SectionHeading
        eyebrow="How we help"
        eyebrowIcon={Layers}
        title="Services"
        subtitle="Everything a venture needs to go from idea to sustained operation, under one roof."
      />

      <motion.div
        variants={staggerContainerVariants(shouldReduceMotion)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {services.map((service) => (
          <motion.div
            key={service.title}
            variants={staggerItemVariants(shouldReduceMotion)}
          >
            <ServiceCard service={service} shouldReduceMotion={shouldReduceMotion} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
