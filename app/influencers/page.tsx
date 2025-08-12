"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
// removed search and filter UI
import { Button } from "@/components/ui/button";
// import StackChip from "./StackChip";
import { stacks } from "../stacks/data";
import AddToCartWithConfirm from "../components/AddToCartWithConfirm";
import { influencers } from "./data";

// Data is managed in './data'

export default function InfluencerDirectory() {
  // no search/filter state
  // show full bios on cards

  const filteredInfluencers = influencers;
  const [catMap, setCatMap] = useState<
    Record<string, { categories: string[]; primary?: string }>
  >({});

  useEffect(() => {
    const allSup = Array.from(
      new Set(influencers.flatMap((inf) => inf.supplements ?? []))
    );
    if (allSup.length === 0) return;
    const params = new URLSearchParams();
    allSup.forEach((n) => params.append("names", n));
    fetch(`/api/supplement-cats?${params.toString()}`)
      .then((r) => r.json())
      .then((json) => setCatMap(json))
      .catch(() => {});
  }, []);

  // specialties removed

  return (
    <div className="pt-24">
      <div className="container py-16 bg-sandy-beige">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold">
            {"Select Influencer"}
          </h1>
          <p className="text-lg text-gray-600 mt-2">
            {"Choice in selection of Influencers"}{" "}
          </p>
        </header>

        {/* search and filter UI removed */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredInfluencers.map((influencer) => (
            <div
              key={influencer.name}
              className="bg-white rounded-2xl shadow-lg p-6 flex flex-col transition-transform hover:-translate-y-2"
            >
              <div className="flex items-start gap-6">
                <Image
                  src={influencer.image || "/placeholder.svg"}
                  alt={influencer.name}
                  width={80}
                  height={80}
                  className="rounded-full"
                />
                <div className="flex-1">
                  <h2 className="text-2xl font-bold">{influencer.name}</h2>
                  <p className="text-sage-green font-medium">
                    {influencer.specialty}
                  </p>
                  {influencer.bio && (
                    <p className="text-sm text-gray-600 mt-2">
                      {influencer.bio}
                    </p>
                  )}
                  {/* 복용/비복용 섹션 제거 (요청) */}
                </div>
              </div>
              <div className="mt-6 flex-grow">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                  Supplement Breakdown
                </h3>
                <div className="space-y-2">
                  {(
                    influencer.cardSupplements ??
                    influencer.supplements ??
                    []
                  ).map((sup) => {
                    const primary = catMap[sup]?.primary;
                    return (
                      <div
                        key={sup}
                        className="flex items-center justify-between rounded-xl border bg-gray-50 px-3 py-2"
                      >
                        <span className="text-sm font-medium text-gray-800">
                          {sup}
                        </span>
                        {primary ? (
                          <span className="text-xs px-2.5 py-1 rounded-full border bg-white text-gray-700">
                            {primary}
                          </span>
                        ) : (
                          <span className="text-xs text-gray-400">&nbsp;</span>
                        )}
                      </div>
                    );
                  })}
                </div>
                {(() => {
                  const all = [
                    "Sleep Optimization",
                    "Cognitive Enhancement",
                    "Beauty / Inner Glow",
                    "Metabolic & Weight",
                    "Energy Boost",
                    "Longevity & Immune",
                  ];
                  const present = new Set(influencer.coveredCategories ?? []);
                  const missing = all.filter((c) => !present.has(c));
                  return (
                    <div className="mt-4">
                      <h4 className="text-xs font-semibold text-gray-600 mb-2">
                        Missing categories
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {missing.length === 0 ? (
                          <span className="text-gray-400 text-xs">None</span>
                        ) : (
                          missing.map((c) => (
                            <span
                              key={c}
                              className="text-xs px-2.5 py-1 rounded-full border bg-gray-50 text-gray-500"
                            >
                              {c}
                            </span>
                          ))
                        )}
                      </div>
                    </div>
                  );
                })()}
              </div>
              <div className="mt-6">
                <div className="flex gap-3">
                  <AddToCartWithConfirm
                    id={"bundle-" + encodeURIComponent(influencer.name)}
                    name={`${influencer.name} bundle`}
                    price={influencer.stacks
                      .slice(0, 6)
                      .map(
                        (sn) => stacks.find((s) => s.name === sn)?.price || 0
                      )
                      .reduce((a, b) => a + b, 0)}
                    image={influencer.image}
                    source="influencers"
                  />
                  <Button variant="outline" asChild>
                    <Link
                      href={`/influencers/${encodeURIComponent(
                        influencer.name
                      )}`}
                    >
                      View Full Profile
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
