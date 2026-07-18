"use client";

import Image from "next/image";
import { Check, Users } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

import { SectionHeading } from "@/components/SectionHeading";
import { Card, CardContent } from "@/components/ui/card";
import { founders, type Founder } from "@/content/founders";
import { cn } from "@/lib/utils";
import { staggerContainerVariants, staggerItemVariants } from "@/lib/motion-variants";

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function FounderAvatar({
  founder,
  shouldReduceMotion,
}: {
  founder: Founder;
  shouldReduceMotion: boolean | null;
}) {
  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 8 }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{
        duration: shouldReduceMotion ? 0.01 : 0.4,
        delay: shouldReduceMotion ? 0 : 0.15,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full ring-2 ring-[var(--accent)]/15 transition-all duration-200 group-hover/card:ring-[var(--accent)]/40 sm:h-32 sm:w-32"
    >
      {founder.photo ? (
        <Image
          src={founder.photo}
          alt={`${founder.name}, ${founder.role}`}
          fill
          sizes="128px"
          className="object-cover"
        />
      ) : (
        <div
          role="img"
          aria-label={`${founder.name}, ${founder.role}`}
          className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[var(--accent)]/30 to-[var(--accent)]/5"
        >
          <span className="text-h1 font-semibold text-[var(--accent)]">
            {getInitials(founder.name)}
          </span>
        </div>
      )}
    </motion.div>
  );
}

function FounderCard({
  founder,
  shouldReduceMotion,
}: {
  founder: Founder;
  shouldReduceMotion: boolean | null;
}) {
  return (
    <Card
      className={cn(
        "h-full border border-[var(--text-secondary)]/15 bg-[var(--surface)] shadow-sm transition-all duration-200",
        "hover:-translate-y-1 hover:border-[var(--accent)]/50 hover:shadow-[0_0_0_1px_var(--accent)]",
      )}
    >
      <CardContent className="flex flex-col gap-6 p-6 sm:p-8">
        <div className="flex items-center gap-5">
          <FounderAvatar founder={founder} shouldReduceMotion={shouldReduceMotion} />

          <div>
            <h3 className="text-h3 text-[var(--text-primary)]">
              {founder.name}
            </h3>
            <span className="mt-2 inline-flex items-center rounded-full bg-[var(--accent)]/10 px-2.5 py-1 text-small font-medium text-[var(--accent)]">
              {founder.role}
            </span>
          </div>
        </div>

        <p className="text-body leading-[1.6] text-[var(--text-secondary)]">
          {founder.bio}
        </p>

        <ul className="flex flex-col gap-2">
          {founder.highlights.map((highlight) => (
            <li key={highlight} className="flex items-start gap-2">
              <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[var(--accent)]/10">
                <Check
                  className="h-2.5 w-2.5 text-[var(--accent)]"
                  aria-hidden="true"
                />
              </span>
              <span className="text-small text-[var(--text-secondary)]">
                {highlight}
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

export function Founders() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="founders">
      <SectionHeading
        eyebrow="Meet the team"
        eyebrowIcon={Users}
        title="Founders"
        subtitle="The two people building RK Delta from the ground up."
      />

      <motion.div
        variants={staggerContainerVariants(shouldReduceMotion)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2"
      >
        {founders.map((founder) => (
          <motion.div
            key={founder.name}
            variants={staggerItemVariants(shouldReduceMotion)}
          >
            <FounderCard founder={founder} shouldReduceMotion={shouldReduceMotion} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
