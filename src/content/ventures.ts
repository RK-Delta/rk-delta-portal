export type VentureStatus = "coming-soon" | "live";

export type Venture = {
  name: string;
  tagline: string;
  status: VentureStatus;
  description: string;
};

export const ventures: Venture[] = [
  {
    name: "Viblooop",
    tagline: "A new rhythm for how communities connect.",
    status: "coming-soon",
    description:
      "Our most anticipated launch — a social platform built around shared moments instead of endless feeds. Currently in private beta.",
  },
  {
    name: "Northline",
    tagline: "Logistics tooling for small operators.",
    status: "coming-soon",
    description:
      "Route planning and fleet coordination software designed for teams too small for enterprise tools and too busy for spreadsheets.",
  },
  {
    name: "Ledgerly",
    tagline: "Bookkeeping that explains itself.",
    status: "live",
    description:
      "An innovative educational technology platform bridging the gap between classroom theory and real-world industry needs through skill-based training, internships, and personalized mentorship.",
  },
  {
    name: "Madarsa Madeenatul Olum",
    tagline: "World-class modern education alongside traditional studies.",
    status: "live",
    description:
      "A lightweight field-reporting app for inspection and maintenance crews — offline-first, built for gloves and gravel, not desks.",
  },
  {
    name: "Harborlist",
    tagline: "Booking software for independent rental operators.",
    status: "coming-soon",
    description:
      "A calendar-first booking and payments tool for boat, gear, and equipment rental businesses currently stuck juggling spreadsheets and phone calls.",
  },
  {
    name: "Daily Links Nepal",
    tagline: "Your daily directory for the latest updates in Nepal.",
    status: "live",
    description:
      "A comprehensive digital news portal and daily directory delivering the latest updates, trending topics, and essential digital resources across Nepal.",
  }
];
