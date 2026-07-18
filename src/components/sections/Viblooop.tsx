"use client";

import { useRef, useSyncExternalStore, type PointerEvent } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

import { Button } from "@/components/ui/button";
import { viblooop } from "@/content/viblooop";

const emptySubscribe = () => () => {};

function usePointerIsFine() {
  return useSyncExternalStore(
    emptySubscribe,
    () => window.matchMedia("(pointer: fine)").matches,
    () => false,
  );
}

export function Viblooop() {
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const finePointer = usePointerIsFine();

  const mouseX = useMotionValue(50);
  const mouseY = useMotionValue(50);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const scrollGlowY = useTransform(scrollYProgress, [0, 1], [25, 75]);

  // Desktop: glow tracks the cursor. Touch/reduced-motion: glow drifts with
  // scroll position instead (or stays put entirely when motion is reduced).
  const glowY = shouldReduceMotion
    ? mouseY
    : finePointer
      ? mouseY
      : scrollGlowY;
  const glowBackground = useMotionTemplate`radial-gradient(640px circle at ${mouseX}% ${glowY}%, var(--accent), transparent 70%)`;

  function handlePointerMove(event: PointerEvent<HTMLElement>) {
    if (shouldReduceMotion || !finePointer || !sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    mouseX.set(((event.clientX - rect.left) / rect.width) * 100);
    mouseY.set(((event.clientY - rect.top) / rect.height) * 100);
  }

  const fadeUp = (delay: number) => ({
    initial: shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 },
    whileInView: shouldReduceMotion ? undefined : { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.6 },
    transition: {
      duration: shouldReduceMotion ? 0.01 : 0.5,
      delay: shouldReduceMotion ? 0 : delay,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  });

  return (
    <section
      id="viblooop"
      ref={sectionRef}
      onPointerMove={handlePointerMove}
      className="relative overflow-hidden border-y border-[var(--accent)]/15 bg-[var(--surface)] px-4 py-28 text-center sm:px-6 lg:px-8"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <div
          className="motion-safe:animate-viblooop-grid absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(var(--text-secondary) 1px, transparent 1px), linear-gradient(90deg, var(--text-secondary) 1px, transparent 1px)",
            backgroundSize: "4rem 4rem",
          }}
        />
        <motion.div
          className="absolute inset-0 opacity-30 blur-3xl dark:opacity-40"
          style={{ background: glowBackground }}
        />
      </div>

      <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center gap-6">
        <motion.span
          {...fadeUp(0)}
          className="text-small font-medium tracking-[0.2em] text-[var(--accent)] uppercase"
        >
          {viblooop.name}
        </motion.span>

        <motion.h2
          initial={
            shouldReduceMotion
              ? { opacity: 1, filter: "blur(0px)" }
              : { opacity: 0, y: 20, filter: "blur(8px)" }
          }
          whileInView={
            shouldReduceMotion
              ? undefined
              : { opacity: 1, y: 0, filter: "blur(0px)" }
          }
          viewport={{ once: true, amount: 0.6 }}
          transition={{
            duration: shouldReduceMotion ? 0.01 : 0.8,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="motion-safe:animate-viblooop-gradient bg-gradient-to-r from-[var(--accent)] via-[var(--text-primary)] to-[var(--accent)] bg-[length:200%_auto] bg-clip-text text-display text-transparent"
        >
          Launching Soon
        </motion.h2>

        <motion.p
          {...fadeUp(0.1)}
          className="text-h3 text-[var(--text-secondary)]"
        >
          {viblooop.tagline}
        </motion.p>

        <motion.p
          {...fadeUp(0.2)}
          className="max-w-xl text-body text-[var(--text-secondary)]"
        >
          {viblooop.description}
        </motion.p>

        <motion.div
          {...fadeUp(0.3)}
          className="mt-2 flex flex-col items-center gap-3"
        >
          <Button
            asChild
            size="lg"
            className="bg-[var(--accent)] text-[var(--bg)] hover:bg-[var(--accent)]/90"
          >
            <a href="#feedback">Get notified</a>
          </Button>
          <span className="text-small text-[var(--text-secondary)]">
            {viblooop.launchWindow}
          </span>
        </motion.div>
      </div>
    </section>
  );
}
