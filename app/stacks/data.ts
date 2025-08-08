export type Category = {
  name: string;
  icon: string;
  color: string;
};

export type StackItem = {
  id: string; // slug-like id, e.g., 'sleepwell'
  name: string;
  category: Category["name"];
  image: string;
  ingredients: string[];
  description: string;
  price: number;
};

export const categories: Category[] = [
  { name: "All", icon: "📋", color: "bg-gray-100" },
  { name: "Better sleep", icon: "🌙", color: "bg-sleep-purple" },
  { name: "Boost focus", icon: "🧠", color: "bg-focus-blue" },
  { name: "Live longer", icon: "🌱", color: "bg-longevity-green" },
  { name: "Glow naturally", icon: "✨", color: "bg-glow-pink" },
  { name: "More energy", icon: "⚡", color: "bg-energy-yellow" },
  { name: "Stay healthy", icon: "🛡️", color: "bg-health-teal" },
];

export const categorySlugToName: Record<string, string> = {
  "better-sleep": "Better sleep",
  "boost-focus": "Boost focus",
  "live-longer": "Live longer",
  "glow-naturally": "Glow naturally",
  "more-energy": "More energy",
  "stay-healthy": "Stay healthy",
};

export const categoryNameToSlug: Record<string, string> = Object.fromEntries(
  Object.entries(categorySlugToName).map(([slug, name]) => [name, slug])
);

const baseStacks: StackItem[] = [
  {
    id: "sleepwell",
    name: "SleepWell",
    category: "Better sleep",
    image: "/supplement-1.png",
    ingredients: ["Melatonin", "L-Theanine", "Magnesium"],
    description: "Drift into a deep, restorative sleep and wake up refreshed.",
    price: 29.99,
  },
  {
    id: "mindsharp",
    name: "MindSharp",
    category: "Boost focus",
    image: "/supplement-2.png",
    ingredients: ["Ginkgo Biloba", "Bacopa Monnieri", "Lion's Mane"],
    description:
      "Enhance cognitive function and mental clarity for peak performance.",
    price: 34.99,
  },
  {
    id: "vitality",
    name: "Vitality",
    category: "Live longer",
    image: "/supplement-3.png",
    ingredients: ["Resveratrol", "NMN", "CoQ10"],
    description: "Support cellular health and promote longevity from within.",
    price: 45.99,
  },
  {
    id: "radiance",
    name: "Radiance",
    category: "Glow naturally",
    image: "/supplement-4.png",
    ingredients: ["Collagen", "Hyaluronic Acid", "Biotin"],
    description:
      "Nourish your skin, hair, and nails for a natural, healthy glow.",
    price: 39.99,
  },
  {
    id: "energyboost",
    name: "EnergyBoost",
    category: "More energy",
    image: "/supplement-1.png",
    ingredients: ["Cordyceps", "B-Vitamins", "Ginseng"],
    description:
      "Sustain your energy levels throughout the day without the crash.",
    price: 24.99,
  },
  {
    id: "immunityguard",
    name: "ImmunityGuard",
    category: "Stay healthy",
    image: "/supplement-2.png",
    ingredients: ["Vitamin C", "Zinc", "Elderberry"],
    description:
      "Strengthen your body's natural defenses to stay well year-round.",
    price: 31.99,
  },
];

import { extraStacks } from "./extra";

export const stacks: StackItem[] = [...baseStacks, ...extraStacks];
