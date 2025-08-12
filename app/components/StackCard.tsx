"use client";

import Image from "next/image";
import { stacks as allStacks } from "../stacks/data";
import AddToCartWithConfirm from "./AddToCartWithConfirm";

type Stack = (typeof allStacks)[number];

function parseOwner(name: string): { displayName: string; owner?: string } {
  const pairs: Array<[string, string]> = [
    ["Sinclair ", "Dr. David Sinclair"],
    ["Huberman ", "Dr. Andrew Huberman"],
    ["Hyman ", "Dr. Mark Hyman"],
    ["Brecka ", "Gary Brecka"],
    ["Verdin ", "Dr. Eric Verdin"],
    ["Blueprint ", "Bryan Johnson (Blueprint)"],
  ];
  for (const [prefix, owner] of pairs) {
    if (name.startsWith(prefix)) {
      return { displayName: name.slice(prefix.length), owner };
    }
  }
  return { displayName: name };
}

export default function StackCard({
  stack,
  source,
  className,
}: {
  stack: Stack;
  source: "home" | "stacks" | "influencers";
  className?: string;
}) {
  const { displayName, owner } = parseOwner(stack.name);

  return (
    <div
      className={
        className ??
        "group bg-white rounded-2xl shadow-lg border border-stone-200/60 overflow-hidden hover:-translate-y-1 transition-transform"
      }
    >
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={stack.image || "/placeholder.svg"}
          alt={displayName}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-6">
        <div className="text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-gray-100 text-gray-800 border border-stone-200/70 ring-1 ring-stone-200/60 shadow-sm w-max mb-3">
          {stack.category}
        </div>
        <h3 className="text-xl font-semibold mb-1">{displayName}</h3>
        {owner && <div className="text-xs text-gray-500 mb-2">by {owner}</div>}
        <p className="text-gray-600 text-sm line-clamp-2 mb-4">
          {stack.description}
        </p>
        <div className="mt-1 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-sage-green font-bold text-lg">
              ${stack.price}
            </span>
          </div>
          <AddToCartWithConfirm
            id={stack.id}
            name={stack.name}
            price={stack.price}
            image={stack.image}
            source={source}
          />
        </div>
      </div>
    </div>
  );
}
