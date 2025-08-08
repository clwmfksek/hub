"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useCart } from "../context/cart-context";
import { useSearchParams } from "next/navigation";
import { categories, stacks, categorySlugToName } from "./data";

export default function StackLibrary() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [addedItems, setAddedItems] = useState<Set<string>>(new Set());
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
    addToCart({ id: s.id, name: s.name, price: s.price, image: s.image });
    setAddedItems((prev) => new Set(prev).add(s.id));
    setTimeout(() => {
      setAddedItems((prev) => {
        const next = new Set(prev);
        next.delete(s.id);
        return next;
      });
    }, 2000);
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
              variant={activeFilter === c.name ? "default" : "outline"}
              onClick={() => setActiveFilter(c.name)}
              className={`rounded-full ${
                activeFilter === c.name
                  ? `${c.color} text-gray-800 hover:opacity-90`
                  : "hover:bg-gray-100"
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
                      className={`text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full ${theme?.color} text-gray-800 border`}
                    >
                      {s.category}
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold mb-2 text-gray-800">
                    {s.name}
                  </h2>
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
      </div>
    </div>
  );
}
