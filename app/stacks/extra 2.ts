import type { StackItem } from "./data";

// 여기에 새로운 스택을 추가하세요.
// 규칙: id는 이름을 소문자/공백제거한 값(예: "NMN Pro" -> "nmnpro").
// 카테고리: "Better sleep" | "Boost focus" | "Live longer" | "Glow naturally" | "More energy" | "Stay healthy"

export const extraStacks: StackItem[] = [
  {
    id: "nmnpro",
    name: "NMN Pro",
    category: "Live longer",
    image: "/supplement-3.png",
    ingredients: ["NMN", "Pterostilbene", "Trans-Resveratrol"],
    description:
      "Advanced longevity stack supporting NAD+ pathways and healthy aging.",
    price: 59.99,
  },
  {
    id: "focuselite",
    name: "Focus Elite",
    category: "Boost focus",
    image: "/supplement-2.png",
    ingredients: ["Citicoline (CDP-Choline)", "L-Tyrosine", "Rhodiola"],
    description:
      "Premium nootropic blend for sustained attention and mental clarity.",
    price: 42.0,
  },
  {
    id: "deepsleepmax",
    name: "Deep Sleep Max",
    category: "Better sleep",
    image: "/supplement-1.png",
    ingredients: ["Magnesium Glycinate", "L-Theanine", "Apigenin"],
    description:
      "Supports deeper, more restorative sleep without next-day grogginess.",
    price: 36.0,
  },
  {
    id: "glowcollagenplus",
    name: "Glow Collagen+",
    category: "Glow naturally",
    image: "/supplement-4.png",
    ingredients: ["Collagen Peptides", "Vitamin C", "Hyaluronic Acid"],
    description: "Nourishes skin, hair, and nails for a healthy, natural glow.",
    price: 44.0,
  },
  {
    id: "energyprime",
    name: "Energy Prime",
    category: "More energy",
    image: "/supplement-1.png",
    ingredients: ["Creatine Monohydrate", "Beta-Alanine", "Vitamin B12"],
    description: "Smooth, sustained energy and performance without jitters.",
    price: 29.5,
  },
  {
    id: "immuneshieldplus",
    name: "Immune Shield+",
    category: "Stay healthy",
    image: "/supplement-2.png",
    ingredients: ["Vitamin D3+K2", "Zinc Picolinate", "Quercetin"],
    description:
      "Daily immune support with well-studied micronutrients and flavonoids.",
    price: 34.0,
  },
];
