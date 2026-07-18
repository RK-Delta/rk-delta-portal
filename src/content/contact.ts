export type ContactSocial = {
  platform: string;
  url: string;
  icon: string;
};

export type ContactContent = {
  email: string;
  socials: ContactSocial[];
};

export const contact: ContactContent = {
  email: "hello@rkdelta.com",
  socials: [
    { platform: "X", url: "https://x.com/rkdelta", icon: "X" },
    {
      platform: "LinkedIn",
      url: "https://www.linkedin.com/company/rkdelta",
      icon: "Briefcase",
    },
    { platform: "GitHub", url: "https://github.com/rkdelta", icon: "Link" },
    {
      platform: "Instagram",
      url: "https://instagram.com/rkdelta",
      icon: "Camera",
    },
  ],
};
