"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function ClientPurchase() {
  const [selected, setSelected] = useState<"one" | "sub">("one");

  return (
    <div className="pt-24 bg-sandy-beige min-h-screen">
      <div className="container px-6 py-16">
        <h1 className="text-4xl font-bold text-center mb-10">
          Purchase Options
        </h1>
        <div className="mx-auto max-w-2xl bg-white rounded-2xl shadow-lg border border-stone-200/60 p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              className={`rounded-xl p-5 text-left ring-1 transition-all ${
                selected === "one"
                  ? "ring-sage-green bg-sage-green/5"
                  : "ring-stone-200 hover:bg-stone-50"
              }`}
              onClick={() => setSelected("one")}
            >
              <div className="text-lg font-semibold mb-1">
                One-time purchase
              </div>
              <p className="text-sm text-gray-600">
                Buy once whenever you want.
              </p>
            </button>
            <button
              className={`rounded-xl p-5 text-left ring-1 transition-all ${
                selected === "sub"
                  ? "ring-sage-green bg-sage-green/5"
                  : "ring-stone-200 hover:bg-stone-50"
              }`}
              onClick={() => setSelected("sub")}
            >
              <div className="text-lg font-semibold mb-1">
                Subscribe (10% off)
              </div>
              <p className="text-sm text-gray-600">
                Save 10% with scheduled deliveries.
              </p>
            </button>
          </div>

          <Button
            className="w-full mt-6 bg-sage-green hover:bg-sage-green-600"
            asChild
          >
            <a href="/purchase/checkout">Continue</a>
          </Button>
        </div>
      </div>
    </div>
  );
}
