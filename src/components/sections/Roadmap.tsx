"use client";

import { useRef } from "react";
import { Check, Lock, Map } from "lucide-react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

import { SectionHeading } from "@/components/SectionHeading";
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
        {status === "planned" && (
          <Lock
            className="h-3.5 w-3.5 text-[var(--text-secondary)]"
            aria-hidden="true"
          />
        )}
      </span>
    </div>
  );
}

function MilestoneCard({ milestone, shouldReduceMotion }: { milestone: RoadmapMilestone; shouldReduceMotion: boolean | null }) {
  const isPlanned = milestone.status === "planned";
  const isInProgress = milestone.status === "in-progress";
  const periodColor = isPlanned
    ? "text-[var(--text-secondary)]"
    : "text-[var(--accent)]";

  return (
    <div className={cn(
      "relative overflow-hidden rounded-lg border bg-[var(--surface)] p-5 transition-colors",
      isInProgress ? "border-[var(--accent)]/30" : "border-[var(--text-secondary)]/10"
    )}>
      {/* Sweeping Premium Glow Background for In-Progress milestones */}
      {isInProgress && !shouldReduceMotion && (
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          <motion.div
            animate={{ left: ["-100%", "200%"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 bottom-0 w-1/2 opacity-40 blur-2xl"
            style={{
              background: "linear-gradient(90deg, transparent, var(--accent), transparent)",
            }}
          />
        </div>
      )}

      <div className={cn("relative z-10", isPlanned && "opacity-60")}>
        <p
          className={cn(
            "text-small font-medium tracking-wide uppercase",
            periodColor,
          )}
        >
          {milestone.period}
        </p>
        <h3
          className={cn(
            "mt-1 text-h3 text-[var(--text-primary)]"
          )}
        >
          {milestone.title}
        </h3>
        <p className="mt-2 text-small text-[var(--text-secondary)]">
          {milestone.description}
        </p>
      </div>

      {/* Frosted Lock Overlay for Planned milestones */}
      {isPlanned && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[var(--surface)]/20 backdrop-blur-[3px]">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--bg)]/80 shadow-sm border border-[var(--text-secondary)]/10 backdrop-blur-md">
            <Lock className="h-5 w-5 text-[var(--text-secondary)]" aria-hidden="true" />
          </div>
        </div>
      )}
    </div>
  );
}

function RoadmapItem({
  milestone,
  isEven,
  shouldReduceMotion,
}: {
  milestone: RoadmapMilestone;
  isEven: boolean;
  shouldReduceMotion: boolean | null;
}) {
  const itemRef = useRef<HTMLLIElement>(null);

  const { scrollYProgress } = useScroll({
    target: itemRef,
    offset: ["start end", "end start"],
  });
  const proximityOpacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.5, 0.8, 1],
    [0.45, 1, 1, 1, 0.45],
  );
  const proximityScale = useTransform(
    scrollYProgress,
    [0, 0.2, 0.5, 0.8, 1],
    [0.94, 1, 1, 1, 0.94],
  );

  return (
    <li
      ref={itemRef}
      className="flex gap-4 md:grid md:grid-cols-[1fr_2rem_1fr] md:items-start md:gap-8"
    >
      <div className="flex w-8 shrink-0 justify-center md:col-start-2 md:justify-self-center">
        <NodeMarker status={milestone.status} />
      </div>

      <motion.div
        style={
          shouldReduceMotion
            ? undefined
            : { opacity: proximityOpacity, scale: proximityScale }
        }
        className={cn(
          "min-w-0 flex-1",
          isEven ? "md:col-start-1" : "md:col-start-3",
        )}
      >
        <MilestoneCard milestone={milestone} shouldReduceMotion={shouldReduceMotion} />
      </motion.div>
    </li>
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
      <SectionHeading
        eyebrow="What's next"
        eyebrowIcon={Map}
        title="Roadmap"
        subtitle="Where RK Delta is headed next, and the milestones along the way."
      />

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
          {roadmap.map((milestone, index) => (
            <RoadmapItem
              key={milestone.title}
              milestone={milestone}
              isEven={index % 2 === 0}
              shouldReduceMotion={shouldReduceMotion}
            />
          ))}
        </ol>
      </div>
    </section>
  );
}
