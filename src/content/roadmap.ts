export type RoadmapStatus = "done" | "in-progress" | "planned";

export type RoadmapMilestone = {
  period: string;
  title: string;
  description: string;
  status: RoadmapStatus;
};

export const roadmap: RoadmapMilestone[] = [
  {
    period: "Early 2026",
    title: "Studio foundations",
    description:
      "Core team, brand, and shared operating playbook in place across design, engineering, and legal.",
    status: "done",
  },
  {
    period: "Q3 2026",
    title: "Viblooop public launch",
    description:
      "Our flagship venture opens to the public after a private beta, backed by a dedicated growth push.",
    status: "in-progress",
  },
  {
    period: "Q4 2026",
    title: "Two new ventures announced",
    description:
      "The next cohort of companies moves from internal validation into public building.",
    status: "planned",
  },
  {
    period: "Early 2027",
    title: "Studio playbook v2",
    description:
      "A refined venture-building process, shaped by lessons from the first portfolio launches.",
    status: "planned",
  },
  {
    period: "Later",
    title: "Ten ventures under one roof",
    description:
      "Grow the portfolio to ten active companies sharing RK Delta's engineering, design, and operations bench.",
    status: "planned",
  },
];
