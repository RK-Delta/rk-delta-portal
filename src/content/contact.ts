export type ContactSocial = {
  platform: string;
  url: string;
  icon: string;
};

export type ContactContent = {
  intro: string;
  responseNote: string;
  email: string;
  whatsappNumber: string;
  socials: ContactSocial[];
};

export const contact: ContactContent = {
  intro:
    "Got a question about a venture, a partnership idea, or feedback on the site? We'd love to hear it.",
  responseNote: "We typically respond within 1-2 business days.",
  email: "rkdelta81@gmail.com",
  whatsappNumber: "+917651914183",
  socials: [
    {
      platform: "LinkedIn",
      url: "https://www.linkedin.com/company/rkdelta",
      icon: "Linkedin",
    },
    { platform: "X", url: "https://x.com/rk_delta", icon: "X" },
    { platform: "GitHub", url: "https://github.com/rkdelta", icon: "Github" },
  ],
};
