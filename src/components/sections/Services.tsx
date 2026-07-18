"use client";

import {
  Code2,
  HandCoins,
  LineChart,
  Rocket,
  Settings2,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

import { services } from "@/content/services";
import { staggerContainerVariants, staggerItemVariants } from "@/lib/motion-variants";

const ICONS: Record<string, LucideIcon> = {
  Rocket,
  Sparkles,
  Code2,
  LineChart,
  HandCoins,
  Settings2,
};

export function Services() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="services">
      <h1 className="text-h1 text-[var(--text-primary)]">Services</h1>
      <p className="mt-3 max-w-2xl text-body text-[var(--text-secondary)]">
        Everything a venture needs to go from idea to sustained operation,
        under one roof.
      </p>

      <motion.div
        variants={staggerContainerVariants(shouldReduceMotion)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
      >
        {services.map((service) => {
          const Icon = ICONS[service.icon];
          return (
            <motion.div
              key={service.title}
              variants={staggerItemVariants(shouldReduceMotion)}
              className="flex flex-col items-start gap-4"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[var(--accent)]/10">
                {Icon && (
                  <Icon
                    className="h-5 w-5 text-[var(--accent)]"
                    aria-hidden="true"
                  />
                )}
              </div>
              <div>
                <h3 className="text-h3 text-[var(--text-primary)]">
                  {service.title}
                </h3>
                <p className="mt-2 text-small text-[var(--text-secondary)]">
                  {service.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
