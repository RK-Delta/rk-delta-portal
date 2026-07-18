export type Service = {
  title: string;
  description: string;
  icon: string;
};

export const services: Service[] = [
  {
    title: "Venture Building",
    description:
      "We take ideas from zero to launch — market validation, product scoping, and a founding team to carry it forward.",
    icon: "Rocket",
  },
  {
    title: "Product Design",
    description:
      "Interfaces and experiences designed with the same care across every venture in the portfolio, not bolted on after launch.",
    icon: "Sparkles",
  },
  {
    title: "Engineering",
    description:
      "A shared engineering bench that ventures can draw on — production-grade infrastructure without hiring a team from scratch.",
    icon: "Code2",
  },
  {
    title: "Growth & Marketing",
    description:
      "Positioning, launch strategy, and channel testing to get each venture in front of the right audience early.",
    icon: "LineChart",
  },
  {
    title: "Fundraising Support",
    description:
      "Pitch narrative, investor introductions, and diligence prep drawn from running this playbook across the portfolio.",
    icon: "HandCoins",
  },
  {
    title: "Ongoing Operations",
    description:
      "Finance, legal, and hiring support that stays in place after launch, so founders can focus on the product.",
    icon: "Settings2",
  },
];
