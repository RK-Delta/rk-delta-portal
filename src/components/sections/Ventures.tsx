"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ventures } from "@/content/ventures";
import { cn } from "@/lib/utils";

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
      <h1 className="text-h1 text-[var(--text-primary)]">Ventures</h1>
      <p className="mt-3 max-w-2xl text-body text-[var(--text-secondary)]">
        A growing portfolio of companies we&apos;re designing, launching, and
        growing from the ground up.
      </p>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {ventures.map((venture) => (
          <motion.div key={venture.name} variants={item}>
            <Card
              className={cn(
                "h-full gap-3 border border-[var(--text-secondary)]/15 bg-[var(--surface)] transition-all duration-200",
                "hover:-translate-y-1 hover:border-[var(--accent)]/50 hover:shadow-[0_0_0_1px_var(--accent)]",
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
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
