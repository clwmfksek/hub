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
        "group bg-white rounded-xl shadow-md border border-stone-200/60 overflow-hidden hover:-translate-y-0.5 transition-transform"
      }
    >
      <div className="relative h-32 w-full overflow-hidden">
        <Image
          src={stack.image || "/placeholder.svg"}
          alt={displayName}
          fill
          className="object-cover group-hover:scale-[1.02] transition-transform duration-300"
        />
      </div>
      <div className="p-4">
        <div className="text-[11px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-800 border border-stone-200 w-max mb-2">
          {stack.category}
        </div>
        <h3 className="text-lg font-semibold mb-0.5">{displayName}</h3>
        {owner && (
          <div className="text-[11px] text-gray-500 mb-2">by {owner}</div>
        )}
        <p className="text-gray-600 text-sm line-clamp-2 mb-3">
          {stack.description}
        </p>
        <div className="mt-0.5 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-sage-green font-semibold text-base">
              ${stack.price}
            </span>
          </div>
          <AddToCartWithConfirm
            id={stack.id}
            name={stack.name}
            price={stack.price}
            image={stack.image}
            source={source}
            className="h-9 px-3 py-1 text-sm"
          />
        </div>
      </div>
    </div>
  );
}
