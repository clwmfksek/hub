"use client";

import { categories } from "@/app/stacks/data";

type Props = {
  presentCategories: string[];
};

export default function InfluencerCardCategories({ presentCategories }: Props) {
  const all = categories.filter((c) => c.name !== "All").map((c) => c.name);
  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {all.map((c) => {
        const has = presentCategories.includes(c);
        return (
          <span
            key={c}
            className={`text-xs px-2.5 py-1 rounded-full border ${
              has ? "bg-gray-100 text-gray-800" : "bg-gray-50 text-gray-400"
            }`}
          >
            {c}
          </span>
        );
      })}
    </div>
  );
}
