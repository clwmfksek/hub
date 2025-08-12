"use client";

import { useEffect, useState } from "react";

type Props = {
  supplements: string[];
  title?: string;
};

export default function SupplementBreakdownClient({
  supplements,
  title = "Supplement Breakdown",
}: Props) {
  const [catMap, setCatMap] = useState<
    Record<string, { categories: string[]; primary?: string }>
  >({});

  useEffect(() => {
    if (!supplements || supplements.length === 0) return;
    const params = new URLSearchParams();
    Array.from(new Set(supplements)).forEach((n) => params.append("names", n));
    fetch(`/api/supplement-cats?${params.toString()}`)
      .then((r) => r.json())
      .then((json) => setCatMap(json))
      .catch(() => {});
  }, [supplements]);

  if (!supplements || supplements.length === 0) return null;

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {supplements.map((sup) => {
          const cats = catMap[sup]?.categories ?? [];
          return (
            <div
              key={sup}
              className="flex items-center justify-between rounded-xl border bg-white px-4 py-3 transition-colors hover:bg-gray-50"
            >
              <span className="text-sm font-medium text-gray-900">{sup}</span>
              <div className="flex items-center gap-1 flex-wrap justify-end">
                {cats.map((c) => (
                  <span
                    key={c}
                    className="text-[11px] px-2 py-0.5 rounded-full border bg-gray-100 text-gray-600"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
