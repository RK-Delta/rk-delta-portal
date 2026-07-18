"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  staggerContainerVariants,
  staggerItemVariants,
} from "@/lib/motion-variants";

export type SectionHeadingProps = {
  eyebrow: string;
  eyebrowIcon?: LucideIcon;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
};

export function SectionHeading({
  eyebrow,
  eyebrowIcon: EyebrowIcon,
  title,
  subtitle,
  align = "left",
}: SectionHeadingProps) {
  const shouldReduceMotion = useReducedMotion();
  const isCentered = align === "center";

  return (
    <motion.div
      variants={staggerContainerVariants(shouldReduceMotion)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
      className={cn("flex flex-col", isCentered && "items-center text-center")}
    >
      <motion.span
        variants={staggerItemVariants(shouldReduceMotion)}
        className="inline-flex w-fit items-center gap-1.5 rounded-full border border-[var(--accent)]/30 bg-[var(--surface)] px-3 py-1 text-small font-medium text-[var(--accent)]"
      >
        {EyebrowIcon && (
          <EyebrowIcon className="h-3.5 w-3.5" aria-hidden="true" />
        )}
        {eyebrow}
      </motion.span>

      <motion.h1
        variants={staggerItemVariants(shouldReduceMotion)}
        className="mt-4 text-h1 text-[var(--text-primary)]"
      >
        {title}
      </motion.h1>

      {subtitle && (
        <motion.p
          variants={staggerItemVariants(shouldReduceMotion)}
          className="mt-3 max-w-2xl text-body text-[var(--text-secondary)]"
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
}
