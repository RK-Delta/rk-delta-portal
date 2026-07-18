import { FeedbackForm } from "@/components/sections/FeedbackForm";

const PLACEHOLDER_SECTIONS = [
  { id: "about", heading: "About" },
  { id: "ventures", heading: "Ventures" },
  { id: "services", heading: "Services" },
  { id: "roadmap", heading: "Roadmap" },
  { id: "updates", heading: "Updates" },
];

export default function Home() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-24 px-4 py-24 sm:px-6 lg:px-8">
      {PLACEHOLDER_SECTIONS.map((section) => (
        <section key={section.id} id={section.id}>
          <h1 className="text-h1 text-[var(--text-primary)]">
            {section.heading}
          </h1>
        </section>
      ))}

      <section id="feedback">
        <h1 className="text-h1 text-[var(--text-primary)]">Feedback</h1>
        <div className="mt-8">
          <FeedbackForm />
        </div>
      </section>
    </div>
  );
}
