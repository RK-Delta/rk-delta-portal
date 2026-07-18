import { Hero } from "@/components/sections/Hero";
import { Viblooop } from "@/components/sections/Viblooop";
import { About } from "@/components/sections/About";
import { Founders } from "@/components/sections/Founders";
import { Ventures } from "@/components/sections/Ventures";
import { Services } from "@/components/sections/Services";
import { Roadmap } from "@/components/sections/Roadmap";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Viblooop />
      <div className="mx-auto flex max-w-6xl flex-col gap-24 px-4 py-24 sm:px-6 lg:px-8">
        <About />

        <Founders />

        <Ventures />

        <Services />

        <Roadmap />

        {/* <div className="grid grid-cols-1 gap-12 lg:grid-cols-[3fr_2fr] lg:items-center lg:gap-16">
          <section id="feedback">
            <h1 className="text-h1 text-[var(--text-primary)]">Feedback</h1>
            <p className="mt-3 max-w-2xl text-body text-[var(--text-secondary)]">
              Questions, ideas, or just want to say hello — we read every
              submission.
            </p>
            <div className="mt-8">
              <FeedbackForm />
            </div>
          </section> */}

          <Contact />
        {/* </div> */}
      </div>
    </>
  );
}
