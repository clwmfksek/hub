"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import StackChip from "./StackChip";
import { influencers } from "./data";

// 데이터는 './data'에서 관리됩니다

export default function InfluencerDirectory() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("All");

  const filteredInfluencers = influencers.filter(
    (inf) =>
      inf.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filter === "All" || inf.specialty.includes(filter))
  );

  const specialties = [
    "All",
    "Wellness Coach",
    "Biohacker",
    "Nutritionist",
    "Longevity Expert",
    "Fitness Guru",
    "Mental Clarity",
    "Dr. David Sinclair",
    "Dr. Andrew Huberman",
    "Dr. Mark Hyman",
    "Longevity Enthusiast",
    "human biologist",
  ];

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

        <div className="flex flex-col md:flex-row gap-4 mb-12">
          <Input
            type="text"
            placeholder="Find by name..."
            className="flex-grow"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-full md:w-[240px]">
              <SelectValue placeholder="Filter by specialty" />
            </SelectTrigger>
            <SelectContent>
              {specialties.map((spec) => (
                <SelectItem key={spec} value={spec}>
                  {spec}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

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
