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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {supplements.map((sup) => {
          const primary = catMap[sup]?.primary;
          const cats = catMap[sup]?.categories ?? [];
          return (
            <div
              key={sup}
              className="flex items-start justify-between rounded-xl border bg-white p-4"
            >
              <div className="text-sm font-medium text-gray-900">{sup}</div>
              <div className="flex items-center gap-2 flex-wrap justify-end">
                {primary ? (
                  <span className="text-xs px-2.5 py-1 rounded-full border bg-gray-50 text-gray-700">
                    {primary}
                  </span>
                ) : null}
                {cats.slice(1).map((c) => (
                  <span
                    key={c}
                    className="text-[11px] px-2 py-0.5 rounded-full border bg-white text-gray-500"
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
