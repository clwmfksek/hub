"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useCart } from "../context/cart-context";
import { useSearchParams } from "next/navigation";
import { categories, stacks, categorySlugToName } from "./data";

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

export default function StackLibrary() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [addedItems, setAddedItems] = useState<Set<string>>(new Set());
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [lastAddedName, setLastAddedName] = useState<string | null>(null);
  const { addToCart } = useCart();
  const searchParams = useSearchParams();

  useEffect(() => {
    const category = searchParams.get("category");
    if (category) {
      const categoryName = categorySlugToName[category] || "All";
      setActiveFilter(categoryName);
    }
  }, [searchParams]);

  const filtered =
    activeFilter === "All"
      ? stacks
      : stacks.filter((s) => s.category === activeFilter);

  const handleAdd = (s: (typeof stacks)[0]) => {
    // add as one-time by default
    addToCart({
      id: s.id,
      name: s.name,
      price: s.price,
      image: s.image,
      billingType: "one-time" as any,
      source: "stacks",
    });
    setAddedItems((prev) => new Set(prev).add(s.id));
    setLastAddedName(s.name);
    setConfirmOpen(true);
  };

  return (
    <div className="pt-24 min-h-screen">
      <div className="container py-16 bg-sandy-beige">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold">
            Find Your Perfect Stack
          </h1>
          <p className="text-lg text-gray-600 mt-2">
            Curated formulas for every wellness goal.
          </p>
        </header>

        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-12">
          {categories.map((c) => (
            <Button
              key={c.name}
              variant="outline"
              onClick={() => setActiveFilter(c.name)}
              className={`rounded-full transition-colors focus-visible:ring-2 focus-visible:ring-stone-300 ${
                activeFilter === c.name
                  ? `bg-gray-200 text-gray-900 border border-gray-300 hover:bg-gray-200 hover:text-gray-900`
                  : `${c.hoverBg ?? "hover:bg-gray-100"} hover:text-gray-800`
              }`}
            >
              {c.name}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filtered.map((s) => {
            const isAdded = addedItems.has(s.id);
            const theme = categories.find((c) => c.name === s.category);
            return (
              <div
                key={s.id}
                className="bg-white rounded-2xl shadow-lg p-6 flex flex-col md:flex-row items-start gap-6 transition-transform hover:-translate-y-2 border border-gray-100"
              >
                <div className="flex-shrink-0">
                  <Image
                    src={s.image || "/placeholder.svg"}
                    alt={s.name}
                    width={150}
                    height={150}
                    className="rounded-lg object-cover aspect-square"
                  />
                </div>
                <div className="flex-1 w-full">
                  <div className="flex items-center gap-2 mb-3">
                    <span
                      className={`text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full ${
                        theme?.color
                      } text-gray-800 border border-stone-200/70 ring-1 ring-stone-200/60 shadow-sm transition-colors duration-200 ${
                        theme?.hoverBg ??
                        "hover:ring-stone-300 hover:shadow-md hover:brightness-95 hover:saturate-125"
                      } active:scale-[0.99]`}
                    >
                      {s.category}
                    </span>
                  </div>
                  {(() => {
                    const { displayName, owner } = parseOwner(s.name);
                    return (
                      <>
                        <h2 className="text-2xl font-bold mb-1 text-gray-800">
                          {displayName}
                        </h2>
                        {owner && (
                          <div className="text-xs text-gray-500 mb-2">
                            by {owner}
                          </div>
                        )}
                      </>
                    );
                  })()}
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    {s.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {s.ingredients.map((ing) => (
                      <span
                        key={ing}
                        className="text-xs bg-gray-100 px-3 py-1 rounded-full text-gray-700 border"
                      >
                        {ing}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <p className="text-3xl font-bold text-sage-green">
                      ${s.price}
                    </p>
                    <Button
                      className={`w-full sm:w-auto px-6 py-2 transition-all duration-300 ${
                        isAdded
                          ? "bg-green-500 hover:bg-green-600"
                          : "bg-sage-green hover:bg-sage-green-600"
                      }`}
                      onClick={() => handleAdd(s)}
                      disabled={isAdded}
                    >
                      {isAdded ? "Added ✓" : "Add to Cart"}
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Added to cart!</DialogTitle>
            </DialogHeader>
            <p className="text-sm text-gray-600 mb-4">
              {lastAddedName
                ? `${lastAddedName} has been added to your cart.`
                : "Item has been added to your cart."}
            </p>
            <DialogFooter>
              <Button variant="outline" onClick={() => setConfirmOpen(false)}>
                Continue Shopping
              </Button>
              <Button className="bg-sage-green hover:bg-sage-green-600" asChild>
                <Link href="/cart">View Cart</Link>
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
