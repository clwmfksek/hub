"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
// removed search and filter UI
import { Button } from "@/components/ui/button";
import StackChip from "./StackChip";
import { influencers } from "./data";

// Data is managed in './data'

export default function InfluencerDirectory() {
  // no search/filter state
  // show full bios on cards

  const filteredInfluencers = influencers;

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
                </div>
              </div>
              <div className="mt-6 flex-grow">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                  Top Stacks
                </h3>
                <div className="flex flex-wrap gap-2">
                  {influencer.stacks.map((stack) => (
                    <StackChip key={stack} name={stack} />
                  ))}
                </div>
              </div>
              <Button
                className="w-full mt-6 bg-sage-green hover:bg-sage-green-600"
                asChild
              >
                <Link
                  href={`/influencers/${encodeURIComponent(influencer.name)}`}
                >
                  View Full Profile
                </Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
