"use client";

import { useRef } from "react";
import { Check } from "lucide-react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

import { roadmap, type RoadmapMilestone, type RoadmapStatus } from "@/content/roadmap";
import { cn } from "@/lib/utils";

function NodeMarker({ status }: { status: RoadmapStatus }) {
  return (
    <div className="relative flex h-8 w-8 shrink-0 items-center justify-center">
      {status === "in-progress" && (
        <span
          aria-hidden="true"
          className="motion-safe:animate-ping absolute inset-0 rounded-full bg-[var(--accent)]/40"
        />
      )}
      <span
        className={cn(
          "relative flex h-8 w-8 items-center justify-center rounded-full border-2",
          status === "done" && "border-[var(--accent)] bg-[var(--accent)]",
          status === "in-progress" &&
            "border-[var(--accent)] bg-[var(--surface)]",
          status === "planned" &&
            "border-[var(--text-secondary)]/40 bg-[var(--surface)]",
        )}
      >
        {status === "done" && (
          <Check className="h-4 w-4 text-[var(--bg)]" aria-hidden="true" />
        )}
      </span>
    </div>
  );
}

function MilestoneCard({ milestone }: { milestone: RoadmapMilestone }) {
  const periodColor =
    milestone.status === "planned"
      ? "text-[var(--text-secondary)]"
      : "text-[var(--accent)]";

  return (
    <div className="rounded-lg border border-[var(--text-secondary)]/10 bg-[var(--surface)] p-5">
      <p
        className={cn(
          "text-small font-medium tracking-wide uppercase",
          periodColor,
        )}
      >
        {milestone.period}
      </p>
      <h3 className="mt-1 text-h3 text-[var(--text-primary)]">
        {milestone.title}
      </h3>
      <p className="mt-2 text-small text-[var(--text-secondary)]">
        {milestone.description}
      </p>
    </div>
  );
}

export function Roadmap() {
  const shouldReduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 75%", "end 60%"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="roadmap">
      <h1 className="text-h1 text-[var(--text-primary)]">Roadmap</h1>
      <p className="mt-3 max-w-2xl text-body text-[var(--text-secondary)]">
        Where RK Delta is headed next, and the milestones along the way.
      </p>

      <div ref={containerRef} className="relative mt-14">
        <div
          aria-hidden="true"
          className="absolute top-0 bottom-0 left-4 w-px -translate-x-1/2 bg-[var(--text-secondary)]/15 md:left-1/2"
        />
        <motion.div
          aria-hidden="true"
          style={
            shouldReduceMotion
              ? { scaleY: 1 }
              : { scaleY: lineScale, transformOrigin: "top" }
          }
          className="absolute top-0 bottom-0 left-4 w-px -translate-x-1/2 bg-[var(--accent)] md:left-1/2"
        />

        <ol className="relative flex flex-col gap-12">
          {roadmap.map((milestone, index) => {
            const isEven = index % 2 === 0;
            return (
              <li
                key={milestone.title}
                className="flex gap-4 md:grid md:grid-cols-[1fr_2rem_1fr] md:items-start md:gap-8"
              >
                <div className="flex w-8 shrink-0 justify-center md:col-start-2 md:justify-self-center">
                  <NodeMarker status={milestone.status} />
                </div>

                <motion.div
                  initial={
                    shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }
                  }
                  whileInView={
                    shouldReduceMotion ? undefined : { opacity: 1, y: 0 }
                  }
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className={cn(
                    "min-w-0 flex-1",
                    isEven ? "md:col-start-1" : "md:col-start-3",
                  )}
                >
                  <MilestoneCard milestone={milestone} />
                </motion.div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
