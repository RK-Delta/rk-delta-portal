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
      "Automated bookkeeping for freelancers and small studios, with plain-language summaries instead of raw ledgers.",
  },
  {
    name: "Fieldnote",
    tagline: "Notes and reports for on-site teams.",
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
    name: "Studio Grade",
    tagline: "Client feedback and approvals for creative teams.",
    status: "live",
    description:
      "A shared review space for designers and agencies to collect client feedback, track revisions, and get sign-off — without the email thread.",
  },
];
