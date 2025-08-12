export type Influencer = {
  name: string;
  specialty: string;
  image: string;
  stacks: string[];
  bio?: string;
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
    bio: `Bryan Johnson, Blueprint founder on a radical mission. I'm investing millions and using my own body as a laboratory to prove we can not just slow aging, but actually reverse it through rigorous data tracking and extreme protocols.`,
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
    bio: `I'm David Sinclair, a Harvard researcher who's spent decades proving that aging isn't inevitable—through my work on epigenetics and NAD+ pathways, and my book Lifespan, I'm showing the world how we can actually reverse the aging process.`,
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
    bio: `Andrew Huberman here, Stanford neuroscientist turned science communicator. I break down the latest brain research into actionable protocols that millions use to hack their sleep, boost performance, and optimize their nervous systems.`,
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
    bio: `I'm Mark Hyman, and I've built my career on a simple belief: your fork is more powerful than any prescription. Through functional medicine and systems biology, I help people use food as medicine to reverse chronic disease and reclaim their health.`,
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
    bio: `Gary Brecka, human biologist and performance optimizer. At The Ultimate Human, I dive deep into your genetic blueprint to unlock peak physical and mental performance—because I believe everyone deserves to live at their absolute best.`,
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
    bio: `I'm Eric Verdin, leading the charge in aging research as CEO of the Buck Institute. My mission is simple: transform how we understand and treat aging by bridging cutting-edge geroscience with real-world applications that extend human healthspan.`,
    sns: {
      instagram: "https://www.instagram.com/buckinstitute/",
      x: "https://twitter.com/ericverdin",
    },
  },
];
