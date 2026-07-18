"use client";

import { Mail } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

import { contact } from "@/content/contact";
import { staggerItemVariants } from "@/lib/motion-variants";
import { SOCIAL_ICONS } from "@/lib/social-icons";

export function Contact() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="contact">
      <motion.div
        variants={staggerItemVariants(shouldReduceMotion)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
        className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <h1 className="text-h1 text-[var(--text-primary)]">Get in touch</h1>
          <a
            href={`mailto:${contact.email}`}
            className="mt-3 inline-flex items-center gap-2 text-h3 text-[var(--text-secondary)] transition-colors duration-200 hover:text-[var(--accent)]"
          >
            <Mail className="h-5 w-5" aria-hidden="true" />
            {contact.email}
          </a>
        </div>

        <div className="flex items-center gap-5">
          {contact.socials.map((social) => {
            const Icon = SOCIAL_ICONS[social.icon];
            return (
              <a
                key={social.platform}
                href={social.url}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={social.platform}
                className="text-[var(--text-secondary)] transition-colors duration-200 hover:text-[var(--accent)]"
              >
                {Icon && <Icon className="h-5 w-5" aria-hidden="true" />}
              </a>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
