import { Hero } from "@/components/sections/Hero";
import { Viblooop } from "@/components/sections/Viblooop";
import { About } from "@/components/sections/About";
import { Founders } from "@/components/sections/Founders";
import { Ventures } from "@/components/sections/Ventures";
import { Services } from "@/components/sections/Services";
import { Roadmap } from "@/components/sections/Roadmap";
import { Feedback } from "@/components/sections/Feedback";
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

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[3fr_2fr] lg:items-center lg:gap-16">
          <Feedback />

          <Contact />
        </div>
      </div>
    </>
  );
}
