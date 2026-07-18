export type AboutValue = {
  title: string;
  description: string;
};

export type AboutContent = {
  mission: string;
  story: string[];
  values?: AboutValue[];
};

export const about: AboutContent = {
  mission:
    "RK Delta exists to build companies that outlast the trends they launched into — designed with care from day one, not iterated into shape after the fact.",
  story: [
    "RK Delta started as a small group of builders who kept ending up in the same conversation: most new companies don't fail from a bad idea, they fail from being assembled too quickly, by teams who never intended to stick around.",
    "So we set out to do the opposite — a studio that builds a small number of ventures at a time, stays involved past launch, and treats design, engineering, and operations as one discipline instead of three handoffs.",
    "Viblooop is the first proof of that approach. It won't be the last.",
  ],
  values: [
    {
      title: "Build in public",
      description:
        "Ventures share progress early, even before there's a polished story to tell.",
    },
    {
      title: "Own the long term",
      description:
        "We stay involved after launch — operations and support don't end when the press cycle does.",
    },
    {
      title: "Craft over speed",
      description:
        "We'd rather ship a smaller thing done well than a bigger thing done fast.",
    },
  ],
};
