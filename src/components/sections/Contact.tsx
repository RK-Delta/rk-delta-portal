"use client";

import { Mail } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

import { Card, CardContent } from "@/components/ui/card";
import { contact } from "@/content/contact";
import { staggerItemVariants } from "@/lib/motion-variants";
import { SOCIAL_ICONS } from "@/lib/social-icons";

function DeltaWatermark() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 100 100"
      className="pointer-events-none absolute -right-8 -bottom-10 h-52 w-52 text-[var(--accent)] opacity-[0.06]"
      fill="none"
    >
      <path d="M50 8 L92 90 L8 90 Z" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function Contact() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="contact">
      <motion.div
        variants={staggerItemVariants(shouldReduceMotion)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
      >
        <Card className="relative overflow-hidden border border-[var(--text-secondary)]/15 bg-[var(--surface)] shadow-sm">
          <DeltaWatermark />

          <CardContent className="relative flex flex-col gap-6 p-6 sm:p-8">
            <div>
              <h1 className="text-h2 text-[var(--text-primary)]">
                Get in touch
              </h1>
              <p className="mt-3 text-body leading-[1.6] text-[var(--text-secondary)]">
                {contact.intro}
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <a
                href={`mailto:${contact.email}`}
                className="inline-flex w-fit items-center gap-2 text-h3 text-[var(--text-primary)] transition-colors duration-200 hover:text-[var(--accent)]"
              >
                <Mail
                  className="h-5 w-5 text-[var(--accent)]"
                  aria-hidden="true"
                />
                {contact.email}
              </a>
              <p className="text-small text-[var(--text-secondary)]">
                {contact.responseNote}
              </p>
            </div>

            <div className="flex flex-col gap-3">
              {contact.socials.map((social) => {
                const Icon = SOCIAL_ICONS[social.icon];
                return (
                  <a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="flex items-center gap-3 rounded-lg border border-[var(--text-secondary)]/15 bg-[var(--bg)] px-4 py-3 text-small font-medium text-[var(--text-primary)] transition-all duration-200 hover:-translate-y-1 hover:border-[var(--accent)]/50 hover:shadow-[0_0_0_1px_var(--accent)]"
                  >
                    {Icon && (
                      <Icon className="h-4 w-4 shrink-0 text-[var(--accent)]" />
                    )}
                    {social.platform}
                  </a>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </section>
  );
}
