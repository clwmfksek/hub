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
  benefits?: string[];
  breakdown?: {
    name: string;
    dose?: string;
    timing?: string;
    evidencePct?: number;
  }[];
};

export const categories: Category[] = [
  { name: "All", icon: "📋", color: "bg-gray-100" },
  { name: "Sleep better", icon: "🌙", color: "bg-sleep-purple" },
  { name: "Boost focus", icon: "🧠", color: "bg-focus-blue" },
  { name: "Glow beautifully", icon: "✨", color: "bg-glow-pink" },
  { name: "Balance metabolism", icon: "🌱", color: "bg-longevity-green" },
  { name: "Boost energy", icon: "⚡", color: "bg-energy-yellow" },
  { name: "Strengthen immunity", icon: "🛡️", color: "bg-health-teal" },
];

export const categorySlugToName: Record<string, string> = {
  "better-sleep": "Sleep better",
  "boost-focus": "Boost focus",
  "glow-naturally": "Glow beautifully",
  "live-longer": "Balance metabolism",
  "more-energy": "Boost energy",
  "stay-healthy": "Strengthen immunity",
};

export const categoryNameToSlug: Record<string, string> = Object.fromEntries(
  Object.entries(categorySlugToName).map(([slug, name]) => [name, slug])
);

const baseStacks: StackItem[] = [
  {
    id: "sleepwell",
    name: "SleepWell",
    category: "Sleep better",
    image: "/supplement-1.png",
    ingredients: ["Melatonin", "L-Theanine", "Magnesium"],
    description: "Drift into a deep, restorative sleep and wake up refreshed.",
    price: 29.99,
    benefits: ["Deep sleep", "Circadian support", "Morning refresh"],
    breakdown: [
      { name: "Melatonin", dose: "1mg", timing: "Evening", evidencePct: 92 },
      { name: "L-Theanine", dose: "200mg", timing: "Evening", evidencePct: 88 },
      { name: "Magnesium", dose: "200mg", timing: "Evening", evidencePct: 85 },
    ],
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
    benefits: ["Memory", "Focus", "Neuroprotection"],
    breakdown: [
      {
        name: "Ginkgo Biloba",
        dose: "120mg",
        timing: "Morning",
        evidencePct: 86,
      },
      { name: "Bacopa", dose: "300mg", timing: "Morning", evidencePct: 83 },
      {
        name: "Lion's Mane",
        dose: "500mg",
        timing: "Morning",
        evidencePct: 80,
      },
    ],
  },
  {
    id: "vitality",
    name: "Vitality",
    category: "Balance metabolism",
    image: "/supplement-3.png",
    ingredients: ["Resveratrol", "NMN", "CoQ10"],
    description: "Support cellular health and promote longevity from within.",
    price: 45.99,
    benefits: ["Healthy aging", "Metabolism", "Mitochondria"],
    breakdown: [
      {
        name: "Resveratrol",
        dose: "250mg",
        timing: "Morning",
        evidencePct: 84,
      },
      { name: "NMN", dose: "500mg", timing: "Morning", evidencePct: 89 },
      { name: "CoQ10", dose: "100mg", timing: "With meals", evidencePct: 82 },
    ],
  },
  {
    id: "radiance",
    name: "Radiance",
    category: "Glow beautifully",
    image: "/supplement-4.png",
    ingredients: ["Collagen", "Hyaluronic Acid", "Biotin"],
    description:
      "Nourish your skin, hair, and nails for a natural, healthy glow.",
    price: 39.99,
    benefits: ["Skin glow", "Hydration", "Hair & nails"],
    breakdown: [
      { name: "Collagen", dose: "5g", timing: "Morning", evidencePct: 87 },
      {
        name: "Hyaluronic Acid",
        dose: "120mg",
        timing: "Anytime",
        evidencePct: 78,
      },
      { name: "Biotin", dose: "5mg", timing: "Anytime", evidencePct: 74 },
    ],
  },
  {
    id: "energyboost",
    name: "EnergyBoost",
    category: "Boost energy",
    image: "/supplement-1.png",
    ingredients: ["Cordyceps", "B-Vitamins", "Ginseng"],
    description:
      "Sustain your energy levels throughout the day without the crash.",
    price: 24.99,
    benefits: ["All-day energy", "ATP support", "Stress resilience"],
    breakdown: [
      { name: "Cordyceps", dose: "1000mg", timing: "Morning", evidencePct: 79 },
      {
        name: "B‑Complex",
        dose: "B-Complex",
        timing: "Morning",
        evidencePct: 72,
      },
      {
        name: "Panax Ginseng",
        dose: "200mg",
        timing: "Morning",
        evidencePct: 76,
      },
    ],
  },
  {
    id: "immunityguard",
    name: "ImmunityGuard",
    category: "Strengthen immunity",
    image: "/supplement-2.png",
    ingredients: ["Vitamin C", "Zinc", "Elderberry"],
    description:
      "Strengthen your body's natural defenses to stay well year-round.",
    price: 31.99,
    benefits: ["Immune", "Antioxidants", "Recovery"],
    breakdown: [
      { name: "Vitamin C", dose: "1000mg", timing: "Anytime", evidencePct: 85 },
      { name: "Zinc", dose: "15mg", timing: "With meals", evidencePct: 77 },
      { name: "Elderberry", dose: "500mg", timing: "Anytime", evidencePct: 73 },
    ],
  },
];

export const stacks: StackItem[] = baseStacks;
