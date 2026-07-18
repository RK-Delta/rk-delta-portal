import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Ventures } from "@/components/sections/Ventures";
import { Services } from "@/components/sections/Services";
import { Roadmap } from "@/components/sections/Roadmap";
import { FeedbackForm } from "@/components/sections/FeedbackForm";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <div className="mx-auto flex max-w-6xl flex-col gap-24 px-4 py-24 sm:px-6 lg:px-8">
        <About />

        <Ventures />

        <Services />

        <Roadmap />

        <section id="feedback">
          <h1 className="text-h1 text-[var(--text-primary)]">Feedback</h1>
          <div className="mt-8">
            <FeedbackForm />
          </div>
        </section>

        <Contact />
      </div>
    </>
  );
}
