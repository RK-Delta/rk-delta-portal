"use client";

import { MouseEvent } from "react";
import Image from "next/image";
import { motion, useMotionTemplate, useMotionValue, useReducedMotion } from "framer-motion";
import { ArrowUpRight, FolderHeart } from "lucide-react";

import { SectionHeading } from "@/components/SectionHeading";
import { staggerContainerVariants, staggerItemVariants } from "@/lib/motion-variants";
import { cn } from "@/lib/utils";

// Content Model
type Project = {
  id: string;
  name: string;
  description: string;
  image: string;
  url: string;
  tech: string[];
};
const projects: Project[] = [
  {
    id: "project-1",
    name: "Mindenious Edutech",
    description: "An innovative educational technology platform bridging the gap between classroom theory and real-world industry needs through skill-based training, internships, and personalized mentorship.",
    image: "/mindenious.png",
    url: "https://www.mindenious.com/",
    tech: ["Angular 21", "TypeScript", "SCSS", "Node.js", "Google AppScript", "MongoDB"],
  },
  {
    id: "project-2",
    name: "Madarsa Madeenatul Olum",
    description: "A holistic educational institution in Nepal providing world-class modern education alongside traditional Islamic studies, nurturing well-rounded leaders from KG to 12th Grade.",
    image: "/mmu.png",
    url: "https://www.madeenatulolum.com/",
    tech: ["Angular 21", "Tailwind", "Vite", "Firebase", "AppScript"],
  },
  {
    id: "project-3",
    name: "Daily Links Nepal",
    description: "A comprehensive digital news portal and daily directory delivering the latest updates, trending topics, and essential digital resources across Nepal.",
    image: "/dailylinks.png",
    url: "https://dailylinksnepal.com/",
    tech: ["Next.js", "React", "Tailwind", "Node.js", "Supabase"],
  }
];

function ProjectCard({ project, shouldReduceMotion }: { project: Project; shouldReduceMotion: boolean | null }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    if (shouldReduceMotion) return;
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      className="group relative flex h-full w-full flex-col rounded-2xl max-w-sm md:max-w-full"
      onMouseMove={handleMouseMove}
    >
      {/* Spotlight Hover Glow (Disabled if reduced motion is active) */}
      {!shouldReduceMotion && (
        <motion.div
          className="pointer-events-none absolute -inset-px z-0 rounded-2xl opacity-0 transition duration-500 group-hover:opacity-100"
          style={{
            background: useMotionTemplate`
              radial-gradient(
                600px circle at ${mouseX}px ${mouseY}px,
                var(--accent) 0%,
                transparent 40%
              )
            `,
          }}
        />
      )}

      {/* Main Card Content */}
      <div className={cn(
        "relative z-10 flex h-full flex-col overflow-hidden rounded-[15px] bg-[var(--surface)] transition-all duration-300",
        "ring-1 ring-[var(--text-secondary)]/15 group-hover:ring-[var(--text-secondary)]/30",
        !shouldReduceMotion && "group-hover:ring-transparent" // Let the spotlight form the ring
      )}>

        {/* Full card click target for accessibility */}
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Visit ${project.name} live site`}
          className="absolute inset-0 z-20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
        />

        {/* Image Preview Container */}
        <div className="relative aspect-video w-full shrink-0 overflow-hidden border-b border-[var(--text-secondary)]/15 bg-[var(--bg)]">
          <Image
            src={project.image}
            alt={`${project.name} - ${project.description}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className={cn(
              "object-cover transition-transform duration-700 ease-out",
              !shouldReduceMotion && "group-hover:scale-[1.03]"
            )}
          />
        </div>

        {/* Content area */}
        <div className="flex flex-1 flex-col p-6">
          <div className="flex items-start justify-between gap-4">
            <h3 className="text-h3 text-[var(--text-primary)]">
              {project.name}
            </h3>
            <div className="flex shrink-0 items-center gap-1.5 rounded-full border border-[var(--accent)]/20 bg-[var(--accent)]/5 px-2.5 py-1">
              <span className="relative flex h-1.5 w-1.5">
                {!shouldReduceMotion && (
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent)] opacity-75"></span>
                )}
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--accent)]"></span>
              </span>
              <span className="text-small font-medium text-[var(--accent)]">Live</span>
            </div>
          </div>

          <p className="mt-3 text-body text-[var(--text-secondary)]">
            {project.description}
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="rounded-md bg-[var(--text-secondary)]/10 px-2 py-1 text-small text-[var(--text-secondary)]"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Spacer to push CTA to the bottom */}
          <div className="mt-auto pt-8">
            <span className="inline-flex items-center text-small font-medium text-[var(--text-primary)] transition-colors group-hover:text-[var(--accent)]">
              Visit site
              <ArrowUpRight
                className={cn(
                  "ml-1 h-4 w-4 transition-transform duration-300",
                  !shouldReduceMotion && "group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                )}
                aria-hidden="true"
              />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProjectsDelivered() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="projects-delivered" className="w-full min-w-0">
      <SectionHeading
        eyebrow="Proven execution"
        eyebrowIcon={FolderHeart}
        title="Projects Delivered"
        subtitle="A selection of live products built and scaled for production."
      />

      {/* Use schema.org JSON-LD for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "itemListElement": projects.map((project, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "item": {
                "@type": "SoftwareApplication",
                "name": project.name,
                "description": project.description,
                "url": project.url,
                "applicationCategory": "WebApplication"
              }
            }))
          })
        }}
      />

      <motion.div
        variants={staggerContainerVariants(shouldReduceMotion)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="mt-10 grid w-full min-w-0 grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {projects.map((project) => (
          <motion.div
            key={project.id}
            variants={staggerItemVariants(shouldReduceMotion)}
          >
            <ProjectCard project={project} shouldReduceMotion={shouldReduceMotion} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
