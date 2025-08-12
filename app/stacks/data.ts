export type Category = {
  name: string;
  icon: string;
  color: string; // strong (selected or default in detail)
  tint?: string; // faint hover background
  hoverBg?: string; // e.g., 'hover:bg-sleep-purple/30'
  activeBg?: string; // e.g., 'active:bg-sleep-purple'
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
  {
    name: "All",
    icon: "📋",
    color: "bg-gray-100",
    tint: "bg-gray-200",
    hoverBg: "hover:bg-gray-200",
    activeBg: "active:bg-gray-300",
  },
  {
    name: "Sleep better",
    icon: "🌙",
    color: "bg-sleep-purple",
    tint: "bg-sleep-purple/30",
    hoverBg: "hover:bg-sleep-purple/30",
    activeBg: "active:bg-sleep-purple",
  },
  {
    name: "Boost focus",
    icon: "🧠",
    color: "bg-focus-blue",
    tint: "bg-focus-blue/30",
    hoverBg: "hover:bg-focus-blue/30",
    activeBg: "active:bg-focus-blue",
  },
  {
    name: "Glow beautifully",
    icon: "✨",
    color: "bg-glow-pink",
    tint: "bg-glow-pink/30",
    hoverBg: "hover:bg-glow-pink/30",
    activeBg: "active:bg-glow-pink",
  },
  {
    name: "Balance metabolism",
    icon: "🌱",
    color: "bg-longevity-green",
    tint: "bg-longevity-green/30",
    hoverBg: "hover:bg-longevity-green/30",
    activeBg: "active:bg-longevity-green",
  },
  {
    name: "Boost energy",
    icon: "⚡",
    color: "bg-energy-yellow",
    tint: "bg-energy-yellow/30",
    hoverBg: "hover:bg-energy-yellow/30",
    activeBg: "active:bg-energy-yellow",
  },
  {
    name: "Strengthen immunity",
    icon: "🛡️",
    color: "bg-health-teal",
    tint: "bg-health-teal/30",
    hoverBg: "hover:bg-health-teal/30",
    activeBg: "active:bg-health-teal",
  },
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

// 기존 데모 스택 제거: 인플루언서별 실제 조합만 유지

// 인플루언서 조합 스택
const influencerStacks: StackItem[] = [
  // David Sinclair
  {
    id: "sinclair-longevity-core",
    name: "Sinclair Longevity Core",
    category: "Balance metabolism",
    image: "/supplement-4.png",
    ingredients: ["NMN", "Resveratrol", "Vitamin D3", "Vitamin K2"],
    description:
      "Core longevity protocol focused on NAD+ support and healthy aging.",
    price: 129,
    benefits: ["NAD+ support", "Healthy aging", "Cell protection"],
    breakdown: [
      { name: "NMN", dose: "250–500mg", timing: "Morning", evidencePct: 89 },
      {
        name: "Resveratrol",
        dose: "150–250mg",
        timing: "Morning",
        evidencePct: 84,
      },
      {
        name: "Vitamin D3",
        dose: "2000 IU",
        timing: "With meals",
        evidencePct: 86,
      },
      {
        name: "Vitamin K2",
        dose: "90–120mcg",
        timing: "With meals",
        evidencePct: 74,
      },
    ],
  },
  {
    id: "sinclair-nad-autophagy",
    name: "Sinclair NAD+ & Autophagy",
    category: "Balance metabolism",
    image: "/supplement-3.png",
    ingredients: ["NMN", "Spermidine", "Resveratrol"],
    description: "Synergistic support for cellular renewal pathways.",
    price: 119,
    benefits: ["Cell renewal", "Healthy aging"],
    breakdown: [
      { name: "NMN", dose: "250–500mg", timing: "Morning", evidencePct: 89 },
      { name: "Spermidine", dose: "1mg+", timing: "Anytime", evidencePct: 74 },
      {
        name: "Resveratrol",
        dose: "150–250mg",
        timing: "Morning",
        evidencePct: 84,
      },
    ],
  },
  {
    id: "sinclair-polyphenols",
    name: "Sinclair Polyphenols",
    category: "Strengthen immunity",
    image: "/supplement-2.png",
    ingredients: ["Resveratrol", "Quercetin", "Fisetin"],
    description: "Broad polyphenol blend to support healthy immune balance.",
    price: 69,
    benefits: ["Antioxidants", "Immune balance"],
    breakdown: [
      {
        name: "Resveratrol",
        dose: "150–250mg",
        timing: "Morning",
        evidencePct: 84,
      },
      {
        name: "Quercetin",
        dose: "250–500mg",
        timing: "With meals",
        evidencePct: 75,
      },
      { name: "Fisetin", dose: "100mg", timing: "Anytime", evidencePct: 72 },
    ],
  },
  {
    id: "sinclair-cardio-metabolic",
    name: "Sinclair Cardio & Metabolic",
    category: "Balance metabolism",
    image: "/supplement-1.png",
    ingredients: ["Omega-3 (EPA + DHA)", "Alpha-lipoic acid", "Vitamin D3"],
    description: "Support lipid balance and mitochondrial function.",
    price: 79,
    benefits: ["Lipids", "Mitochondria"],
    breakdown: [
      {
        name: "Omega-3 (EPA + DHA)",
        dose: "1g EPA+DHA",
        timing: "With meals",
        evidencePct: 85,
      },
      {
        name: "Alpha-lipoic acid",
        dose: "300mg",
        timing: "With meals",
        evidencePct: 80,
      },
      {
        name: "Vitamin D3",
        dose: "2000 IU",
        timing: "With meals",
        evidencePct: 86,
      },
    ],
  },

  // Andrew Huberman
  {
    id: "huberman-sleep-stack",
    name: "Huberman Sleep Stack",
    category: "Sleep better",
    image: "/supplement-1.png",
    ingredients: ["Magnesium Threonate", "Apigenin", "L-Theanine"],
    description: "Clinically inspired sleep protocol for deep, restful sleep.",
    price: 64,
    benefits: ["Sleep latency", "Deep sleep", "Calm"],
    breakdown: [
      {
        name: "Magnesium Threonate",
        dose: "144mg elem.",
        timing: "Evening",
        evidencePct: 88,
      },
      { name: "Apigenin", dose: "50mg", timing: "Evening", evidencePct: 80 },
      { name: "L-Theanine", dose: "200mg", timing: "Evening", evidencePct: 86 },
    ],
  },
  {
    id: "huberman-hormone-support",
    name: "Huberman Hormone Support",
    category: "Balance metabolism",
    image: "/supplement-3.png",
    ingredients: ["Tongkat Ali", "Fadogia Agrestis", "Vitamin D3", "Zinc"],
    description: "Support healthy androgen and metabolic balance.",
    price: 79,
    benefits: ["Hormone balance", "Vitality"],
    breakdown: [
      {
        name: "Tongkat Ali",
        dose: "200–400mg",
        timing: "Morning",
        evidencePct: 76,
      },
      {
        name: "Fadogia Agrestis",
        dose: "300–600mg",
        timing: "Morning",
        evidencePct: 68,
      },
      {
        name: "Vitamin D3",
        dose: "2000 IU",
        timing: "With meals",
        evidencePct: 86,
      },
      { name: "Zinc", dose: "10–15mg", timing: "With meals", evidencePct: 80 },
    ],
  },
  {
    id: "huberman-focus-stress",
    name: "Huberman Focus & Stress",
    category: "Boost focus",
    image: "/supplement-2.png",
    ingredients: ["Omega-3 (EPA + DHA)", "L-Theanine", "Rhodiola Rosea"],
    description: "Enhance focus while supporting stress resilience.",
    price: 59,
    benefits: ["Focus", "Stress resilience"],
    breakdown: [
      {
        name: "Omega-3 (EPA + DHA)",
        dose: "1g EPA+DHA",
        timing: "With meals",
        evidencePct: 85,
      },
      {
        name: "L-Theanine",
        dose: "100–200mg",
        timing: "Morning",
        evidencePct: 84,
      },
      {
        name: "Rhodiola Rosea",
        dose: "200–400mg",
        timing: "Morning",
        evidencePct: 78,
      },
    ],
  },
  {
    id: "huberman-performance",
    name: "Huberman Performance",
    category: "Boost energy",
    image: "/supplement-3.png",
    ingredients: ["Creatine", "Omega-3 (EPA + DHA)"],
    description: "Power and recovery support for training days.",
    price: 49,
    benefits: ["Power output", "Recovery"],
    breakdown: [
      { name: "Creatine", dose: "3–5g", timing: "Anytime", evidencePct: 90 },
      {
        name: "Omega-3 (EPA + DHA)",
        dose: "1g EPA+DHA",
        timing: "With meals",
        evidencePct: 85,
      },
    ],
  },

  // Mark Hyman
  {
    id: "hyman-foundational-wellness",
    name: "Hyman Foundational Wellness",
    category: "Strengthen immunity",
    image: "/supplement-2.png",
    ingredients: [
      "Multivitamin",
      "Omega-3 (EPA + DHA)",
      "Magnesium",
      "Vitamin D3",
      "Vitamin K2",
    ],
    description: "Daily wellness foundation based on functional medicine.",
    price: 79,
    benefits: ["Micronutrient sufficiency", "Immune"],
    breakdown: [
      {
        name: "Multivitamin",
        dose: "per label",
        timing: "With meals",
        evidencePct: 70,
      },
      {
        name: "Omega-3 (EPA + DHA)",
        dose: "1g EPA+DHA",
        timing: "With meals",
        evidencePct: 85,
      },
      {
        name: "Magnesium",
        dose: "200–400mg",
        timing: "Evening",
        evidencePct: 82,
      },
      {
        name: "Vitamin D3",
        dose: "2000 IU",
        timing: "With meals",
        evidencePct: 86,
      },
      {
        name: "Vitamin K2",
        dose: "90–120mcg",
        timing: "With meals",
        evidencePct: 74,
      },
    ],
  },
  {
    id: "hyman-metabolic-balance",
    name: "Hyman Metabolic Balance",
    category: "Balance metabolism",
    image: "/supplement-3.png",
    ingredients: ["Berberine", "Alpha-lipoic acid", "Resveratrol"],
    description: "Support glucose and insulin sensitivity pathways.",
    price: 69,
    benefits: ["Glucose", "Insulin sensitivity"],
    breakdown: [
      {
        name: "Berberine",
        dose: "500mg",
        timing: "With meals",
        evidencePct: 88,
      },
      {
        name: "Alpha-lipoic acid",
        dose: "300mg",
        timing: "With meals",
        evidencePct: 80,
      },
      {
        name: "Resveratrol",
        dose: "150–250mg",
        timing: "Morning",
        evidencePct: 84,
      },
    ],
  },
  {
    id: "hyman-detox-support",
    name: "Hyman Detox Support",
    category: "Strengthen immunity",
    image: "/supplement-1.png",
    ingredients: ["NAC", "Glutathione", "Curcumin"],
    description: "Antioxidant trio for cellular defense and detox pathways.",
    price: 69,
    benefits: ["Antioxidants", "Cell defense"],
    breakdown: [
      { name: "NAC", dose: "600mg", timing: "Anytime", evidencePct: 78 },
      {
        name: "Glutathione",
        dose: "250–500mg",
        timing: "Anytime",
        evidencePct: 72,
      },
      {
        name: "Curcumin",
        dose: "500mg",
        timing: "With meals",
        evidencePct: 75,
      },
    ],
  },
  {
    id: "hyman-gut-health",
    name: "Hyman Gut Health",
    category: "Strengthen immunity",
    image: "/supplement-4.png",
    ingredients: ["Probiotics", "Curcumin", "Omega-3 (EPA + DHA)"],
    description: "Gut-immune axis support for everyday resilience.",
    price: 49,
    benefits: ["Gut", "Immune"],
    breakdown: [
      {
        name: "Probiotics",
        dose: "10B+ CFU",
        timing: "Anytime",
        evidencePct: 76,
      },
      {
        name: "Curcumin",
        dose: "500mg",
        timing: "With meals",
        evidencePct: 75,
      },
      {
        name: "Omega-3 (EPA + DHA)",
        dose: "1g EPA+DHA",
        timing: "With meals",
        evidencePct: 85,
      },
    ],
  },

  // Gary Brecka
  {
    id: "brecka-methylation",
    name: "Brecka Methylation",
    category: "Strengthen immunity",
    image: "/supplement-2.png",
    ingredients: ["Methylated B-Complex", "Vitamin D3", "Vitamin K2"],
    description: "Methylation and micronutrient support for daily wellness.",
    price: 69,
    benefits: ["Methylation", "Immune"],
    breakdown: [
      {
        name: "Methylated B-Complex",
        dose: "per label",
        timing: "Morning",
        evidencePct: 72,
      },
      {
        name: "Vitamin D3",
        dose: "2000 IU",
        timing: "With meals",
        evidencePct: 86,
      },
      {
        name: "Vitamin K2",
        dose: "90–120mcg",
        timing: "With meals",
        evidencePct: 74,
      },
    ],
  },
  {
    id: "brecka-antioxidant",
    name: "Brecka Antioxidant",
    category: "Strengthen immunity",
    image: "/supplement-3.png",
    ingredients: ["Glutathione", "CoQ10", "Vitamin C"],
    description: "Antioxidant synergy for cellular protection.",
    price: 69,
    benefits: ["Antioxidants", "Mitochondria"],
    breakdown: [
      {
        name: "Glutathione",
        dose: "250–500mg",
        timing: "Anytime",
        evidencePct: 72,
      },
      { name: "CoQ10", dose: "100mg", timing: "With meals", evidencePct: 82 },
      {
        name: "Vitamin C",
        dose: "500–1000mg",
        timing: "Anytime",
        evidencePct: 85,
      },
    ],
  },
  {
    id: "brecka-performance",
    name: "Brecka Performance",
    category: "Boost energy",
    image: "/supplement-1.png",
    ingredients: ["L-Arginine", "Omega-3 (EPA + DHA)", "Magnesium"],
    description: "Performance and recovery support.",
    price: 49,
    benefits: ["Circulation", "Recovery"],
    breakdown: [
      {
        name: "L-Arginine",
        dose: "2–6g",
        timing: "Pre-workout",
        evidencePct: 70,
      },
      {
        name: "Omega-3 (EPA + DHA)",
        dose: "1g EPA+DHA",
        timing: "With meals",
        evidencePct: 85,
      },
      {
        name: "Magnesium",
        dose: "200–400mg",
        timing: "Evening",
        evidencePct: 82,
      },
    ],
  },
  {
    id: "brecka-gut-immune",
    name: "Brecka Gut & Immune",
    category: "Strengthen immunity",
    image: "/supplement-4.png",
    ingredients: ["Probiotics", "Curcumin", "Zinc"],
    description: "Microbiome and immune support stack.",
    price: 49,
    benefits: ["Gut", "Immune"],
    breakdown: [
      {
        name: "Probiotics",
        dose: "10B+ CFU",
        timing: "Anytime",
        evidencePct: 76,
      },
      {
        name: "Curcumin",
        dose: "500mg",
        timing: "With meals",
        evidencePct: 75,
      },
      { name: "Zinc", dose: "10–15mg", timing: "With meals", evidencePct: 80 },
    ],
  },

  // Eric Verdin
  {
    id: "verdin-longevity-basics",
    name: "Verdin Longevity Basics",
    category: "Strengthen immunity",
    image: "/supplement-2.png",
    ingredients: ["Vitamin D3", "Omega-3 (EPA + DHA)", "Magnesium"],
    description: "Simple, evidence-based daily longevity basics.",
    price: 59,
    benefits: ["Immune", "Cardiometabolic"],
    breakdown: [
      {
        name: "Vitamin D3",
        dose: "2000 IU",
        timing: "With meals",
        evidencePct: 86,
      },
      {
        name: "Omega-3 (EPA + DHA)",
        dose: "1g EPA+DHA",
        timing: "With meals",
        evidencePct: 85,
      },
      {
        name: "Magnesium",
        dose: "200–400mg",
        timing: "Evening",
        evidencePct: 82,
      },
    ],
  },
  {
    id: "verdin-mito-performance",
    name: "Verdin Mito Performance",
    category: "Boost energy",
    image: "/supplement-3.png",
    ingredients: ["CoQ10", "Creatine"],
    description: "Mitochondrial performance and ATP support.",
    price: 59,
    benefits: ["Mitochondria", "ATP"],
    breakdown: [
      { name: "CoQ10", dose: "100mg", timing: "With meals", evidencePct: 82 },
      { name: "Creatine", dose: "3–5g", timing: "Anytime", evidencePct: 90 },
    ],
  },
  {
    id: "verdin-antioxidant",
    name: "Verdin Antioxidant",
    category: "Strengthen immunity",
    image: "/supplement-1.png",
    ingredients: ["NAC", "Polyphenol blend"],
    description: "Broadspectrum antioxidant and redox support.",
    price: 49,
    benefits: ["Antioxidants", "Redox"],
    breakdown: [
      { name: "NAC", dose: "600mg", timing: "Anytime", evidencePct: 78 },
      {
        name: "Polyphenol blend",
        dose: "per label",
        timing: "With meals",
        evidencePct: 70,
      },
    ],
  },
  {
    id: "verdin-gut-support",
    name: "Verdin Gut Support",
    category: "Strengthen immunity",
    image: "/supplement-4.png",
    ingredients: ["Probiotics", "Vitamin D3"],
    description:
      "Gut-supportive duo to reinforce the barrier and immune balance.",
    price: 39,
    benefits: ["Gut", "Immune"],
    breakdown: [
      {
        name: "Probiotics",
        dose: "10B+ CFU",
        timing: "Anytime",
        evidencePct: 76,
      },
      {
        name: "Vitamin D3",
        dose: "2000 IU",
        timing: "With meals",
        evidencePct: 86,
      },
    ],
  },

  // Bryan Johnson (Blueprint)
  {
    id: "blueprint-core",
    name: "Blueprint Core",
    category: "Balance metabolism",
    image: "/supplement-4.png",
    ingredients: [
      "Blueprint Essentials (Multivitamin)",
      "Omega-3 (EPA + DHA)",
      "Longevity Protein",
      "NMN",
    ],
    description:
      "Blueprint foundational routine for longevity and performance.",
    price: 129,
    benefits: ["Longevity", "Performance"],
    breakdown: [
      {
        name: "Blueprint Essentials (Multivitamin)",
        dose: "per label",
        timing: "With meals",
        evidencePct: 70,
      },
      {
        name: "Omega-3 (EPA + DHA)",
        dose: "1g EPA+DHA",
        timing: "With meals",
        evidencePct: 85,
      },
      {
        name: "Longevity Protein",
        dose: "per label",
        timing: "Anytime",
        evidencePct: 68,
      },
      { name: "NMN", dose: "250–500mg", timing: "Morning", evidencePct: 89 },
    ],
  },
  {
    id: "blueprint-cardio",
    name: "Blueprint Cardio",
    category: "Strengthen immunity",
    image: "/supplement-2.png",
    ingredients: [
      "Red Yeast Rice + Garlic",
      "Aged Garlic",
      "Omega-3 (EPA + DHA)",
    ],
    description: "Lipid and arterial support aligned with Blueprint.",
    price: 89,
    benefits: ["Lipids", "Vascular"],
    breakdown: [
      {
        name: "Red Yeast Rice + Garlic",
        dose: "per label",
        timing: "With meals",
        evidencePct: 72,
      },
      {
        name: "Aged Garlic",
        dose: "per label",
        timing: "With meals",
        evidencePct: 70,
      },
      {
        name: "Omega-3 (EPA + DHA)",
        dose: "1g EPA+DHA",
        timing: "With meals",
        evidencePct: 85,
      },
    ],
  },
  {
    id: "blueprint-gut",
    name: "Blueprint Gut",
    category: "Strengthen immunity",
    image: "/supplement-1.png",
    ingredients: ["Prebiotic GOS", "ProButyrate"],
    description: "Prebiotic and postbiotic approach to Blueprint gut health.",
    price: 59,
    benefits: ["Gut", "Microbiome"],
    breakdown: [
      {
        name: "Prebiotic GOS",
        dose: "per label",
        timing: "Anytime",
        evidencePct: 70,
      },
      {
        name: "ProButyrate",
        dose: "per label",
        timing: "With meals",
        evidencePct: 68,
      },
    ],
  },
  {
    id: "blueprint-performance",
    name: "Blueprint Performance",
    category: "Boost energy",
    image: "/supplement-3.png",
    ingredients: ["Creatine", "NMN"],
    description: "Performance and cellular energy support.",
    price: 59,
    benefits: ["Power", "ATP"],
    breakdown: [
      { name: "Creatine", dose: "3–5g", timing: "Anytime", evidencePct: 90 },
      { name: "NMN", dose: "250–500mg", timing: "Morning", evidencePct: 89 },
    ],
  },
  {
    id: "blueprint-anti-inflammatory",
    name: "Blueprint Anti-inflammatory",
    category: "Strengthen immunity",
    image: "/supplement-2.png",
    ingredients: ["NAC + Ginger + Curcumin"],
    description: "Combined anti-inflammatory formula per Blueprint protocol.",
    price: 69,
    benefits: ["Inflammation", "Antioxidants"],
    breakdown: [
      {
        name: "NAC + Ginger + Curcumin",
        dose: "per label",
        timing: "With meals",
        evidencePct: 74,
      },
    ],
  },
  {
    id: "blueprint-vision",
    name: "Blueprint Vision",
    category: "Boost focus",
    image: "/supplement-4.png",
    ingredients: ["Blueprint Soft Gel (Vision)"],
    description: "Vision-specific soft gel aligned with Blueprint routine.",
    price: 49,
    benefits: ["Vision", "Cognition"],
    breakdown: [
      {
        name: "Blueprint Soft Gel (Vision)",
        dose: "per label",
        timing: "With meals",
        evidencePct: 65,
      },
    ],
  },
];

export const stacks: StackItem[] = influencerStacks;
