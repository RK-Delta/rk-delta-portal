import { Hero, GRAIN_DATA_URI } from "@/components/sections/Hero";
import { Viblooop } from "@/components/sections/Viblooop";
import { Ventures } from "@/components/sections/Ventures";
import { Services } from "@/components/sections/Services";
import { ProjectsDelivered } from "@/components/sections/ProjectsDelivered";
import { SatisfiedCustomers } from "@/components/sections/SatisfiedCustomers";
import { Roadmap } from "@/components/sections/Roadmap";
import { Closing } from "@/components/sections/Closing";

export default function Home() {
  return (
    <div className="relative flex flex-col">
      {/* Continuous Page Background */}
      <div 
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-[var(--bg)] via-[var(--surface)] to-[var(--bg)]"
      />
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.03]"
        style={{
          backgroundImage: GRAIN_DATA_URI,
          backgroundRepeat: "repeat",
          backgroundSize: "140px 140px",
        }}
      />

      <Hero />
      <Viblooop />
      <div className="mx-auto flex max-w-6xl flex-col gap-24 px-4 py-24 sm:px-6 lg:px-8">
        <Ventures />
        <Services />
        <ProjectsDelivered />
        <SatisfiedCustomers />
        <Roadmap />
      </div>
      <Closing />
    </div>
  );
}
