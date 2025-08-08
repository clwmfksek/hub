export type Influencer = {
  name: string;
  specialty: string;
  image: string;
  stacks: string[];
  sns?: {
    instagram?: string; // full URL or handle
    x?: string; // full URL
  };
};

export const influencers: Influencer[] = [
  {
    name: "Bryan Johnson",
    specialty: "Longevity Enthusiast",
    image: "/people/bryan.jpg",
    stacks: ["NMN Pro", "Vitality", "Energy Prime", "Immune Shield+"],
    sns: {
      instagram: "https://www.instagram.com/bryanjohnson_",
      x: "https://twitter.com/bryan_johnson",
    },
  },
  {
    name: "David Sinclair",
    specialty: "Dr. David Sinclair",
    image: "/people/david.jpg",
    stacks: ["NMN Pro", "Vitality", "Immune Shield+", "MindSharp"],
    sns: {
      instagram: "https://www.instagram.com/davidsinclairphd/",
      x: "https://twitter.com/davidasinclair",
    },
  },
  {
    name: "Andrew Huberman",
    specialty: "Dr. Andrew Huberman",
    image: "/people/andrew.jpg",
    stacks: ["Focus Elite", "Deep Sleep Max", "Energy Prime"],
    sns: {
      instagram: "https://www.instagram.com/hubermanlab/",
      x: "https://twitter.com/hubermanlab",
    },
  },
  {
    name: "Mark Hyman",
    specialty: "Dr. Mark Hyman",
    image: "/people/mark.jpg",
    stacks: ["Immune Shield+", "Glow Collagen+", "SleepWell"],
    sns: {
      instagram: "https://www.instagram.com/drmarkhyman/",
      x: "https://twitter.com/drmarkhyman",
    },
  },
  {
    name: "Gary Brecka",
    specialty: "human biologist",
    image: "/people/Gary-Brecka.jpg",
    stacks: ["Energy Prime", "Immune Shield+", "Focus Elite"],
    sns: {
      instagram: "https://www.instagram.com/garybrecka/",
      x: "https://twitter.com/garybrecka",
    },
  },
  {
    name: "Eric Verdin",
    specialty: "Dr. Eric Verdin",
    image: "/people/Eric.verdin.jpg",
    stacks: ["Vitality", "NMN Pro", "Immune Shield+"],
    sns: {
      instagram: "https://www.instagram.com/buckinstitute/",
      x: "https://twitter.com/ericverdin",
    },
  },
];
