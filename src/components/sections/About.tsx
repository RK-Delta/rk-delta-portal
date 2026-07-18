"use client";

import { motion, useReducedMotion } from "framer-motion";

import { about } from "@/content/about";
import { staggerItemVariants } from "@/lib/motion-variants";

function DeltaMark() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 100 100"
      className="h-32 w-32 text-[var(--accent)] opacity-40 lg:h-40 lg:w-40"
      fill="none"
    >
      <path d="M50 12 L90 88 L10 88 Z" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M50 40 L71 88 L29 88 Z"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.5"
      />
    </svg>
  );
}

export function About() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="about">
      <motion.div
        variants={staggerItemVariants(shouldReduceMotion)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <h1 className="text-h1 text-[var(--text-primary)]">About RK Delta</h1>
        <p className="mt-6 max-w-prose text-h3 text-[var(--text-primary)]">
          {about.mission}
        </p>

        <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-[3fr_2fr] lg:gap-16">
          <div className="space-y-6">
            {about.story.map((paragraph) => (
              <p
                key={paragraph}
                className="max-w-prose text-body leading-[1.6] text-[var(--text-secondary)]"
              >
                {paragraph}
              </p>
            ))}
          </div>

          {about.values && about.values.length > 0 && (
            <div className="flex flex-col gap-10">
              <DeltaMark />
              <dl className="space-y-6">
                {about.values.map((value) => (
                  <div key={value.title}>
                    <dt className="text-h3 text-[var(--text-primary)]">
                      {value.title}
                    </dt>
                    <dd className="mt-1 text-small text-[var(--text-secondary)]">
                      {value.description}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          )}
        </div>
      </motion.div>
    </section>
  );
}
