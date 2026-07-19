export type Founder = {
  name: string;
  role: string;
  bio: string;
  highlights: string[];
  photo?: string;
};

export const founders: Founder[] = [
  {
    name: "Kamrujama Ansari",
    role: "Co-Founder & Full-Stack Engineer",
    bio: "Full-stack developer who has led engineering on a range of web platforms end to end, from architecture through to production. Focused on building systems that are meant to last, not just ship.",
    highlights: [
      "Led engineering as lead developer across multiple production platforms",
      "Built an edtech platform from scratch for 100k+ users, including architecture, backend, and frontend",
      "Full-stack across Angular, React, NextJs, Node.js, and cloud infrastructure",
    ],
  },
  {
    name: "Ravi Shankar Jaiswal",
    role: "Co-Founder & Full-Stack Engineer",
    bio: "Full-stack developer who has led development teams across multiple client and product launches. Brings equal focus to frontend craft and backend reliability under real deadlines.",
    highlights: [
      "Led development teams across multiple product and client launches",
      "Full-stack engineer spanning frontend, backend, and DevOps",
      "Focused on shipping reliable systems under tight timelines",
    ],
  },
];
