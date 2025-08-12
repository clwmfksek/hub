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
    bio: `A tech entrepreneur turned longevity pioneer, Johnson has gained international attention for his Blueprint protocol—a comprehensive, data-driven approach to age reversal that combines rigorous self-experimentation with substantial financial investment in cutting-edge anti-aging research.`,
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
    bio: `A pioneering Harvard geneticist whose groundbreaking research on epigenetics and NAD+ has fundamentally challenged our understanding of aging, Dr. Sinclair has become one of the most influential voices in longevity science through his acclaimed book Lifespan and extensive academic contributions.`,
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
    bio: `Stanford's renowned neuroscientist who has revolutionized science communication, Dr. Huberman translates complex brain research into practical wellness strategies through his wildly successful podcast, reaching millions with evidence-based approaches to optimize human performance.`,
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
    bio: `A visionary physician who transformed modern medicine through functional approaches, Dr. Hyman has authored numerous bestsellers while pioneering the food-as-medicine movement, demonstrating how systems biology can reverse chronic disease and promote longevity.`,
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
    bio: `An innovative human biologist and performance specialist, Brecka has established himself as a leading authority in genetic optimization, using his company The Ultimate Human to help individuals unlock their biological potential through personalized health protocols.`,
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
    bio: `A distinguished Belgian geroscientist who has shaped the global aging research landscape, Dr. Verdin leads the prestigious Buck Institute for Research on Aging, driving innovative studies that bridge laboratory discoveries with clinical applications for human healthspan extension.`,
    sns: {
      instagram: "https://www.instagram.com/buckinstitute/",
      x: "https://twitter.com/ericverdin",
    },
  },
];
