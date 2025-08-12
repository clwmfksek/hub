"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Link from "next/link";
import { useCart } from "../context/cart-context";
import { sendEvent } from "@/lib/gtag";
import { cn } from "@/lib/utils";

type Props = {
  id: string;
  name: string;
  price: number;
  image: string;
  source?: "stacks" | "influencers" | "home";
  className?: string;
  // When coming from influencers, provide missing influencer categories to recommend stacks
  missingCategories?: string[];
};

export default function AddToCartWithConfirm({
  id,
  name,
  price,
  image,
  source,
  className,
  missingCategories,
}: Props) {
  const { addToCart } = useCart();
  const [open, setOpen] = useState(false);

  const handleAdd = () => {
    addToCart({
      id,
      name,
      price,
      image,
      billingType: "one-time" as any,
      source,
    });
    try {
      sendEvent("add_to_cart", {
        currency: "USD",
        value: price,
        items: [{ item_id: id, item_name: name, price, quantity: 1 }],
      });
    } catch {}
    setOpen(true);
  };

  return (
    <>
      <Button
        className={cn(
          "px-6 py-2 bg-sage-green hover:bg-sage-green-600",
          className
        )}
        onClick={handleAdd}
      >
        Add to Cart
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Added to cart!</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-gray-600 mb-4">
            {name} has been added to your cart.
          </p>
          {source === "influencers" &&
            Array.isArray(missingCategories) &&
            missingCategories.length > 0 && (
              <MissingCategoryRecommendations
                missingCategories={missingCategories}
                onQuickAdd={(stack) => {
                  addToCart({
                    id: stack.id,
                    name: stack.name,
                    price: stack.price,
                    image: stack.image,
                    billingType: "one-time" as any,
                    source: "stacks",
                  });
                }}
              />
            )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Continue Shopping
            </Button>
            <Button className="bg-sage-green hover:bg-sage-green-600" asChild>
              <Link href="/cart">View Cart</Link>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

function mapInfluencerCatToStackCat(cat: string): string | null {
  switch (cat) {
    case "Sleep Optimization":
      return "Sleep better";
    case "Cognitive Enhancement":
      return "Boost focus";
    case "Beauty / Inner Glow":
      return "Glow beautifully";
    case "Metabolic & Weight":
      return "Balance metabolism";
    case "Energy Boost":
      return "Boost energy";
    case "Longevity & Immune":
      return "Strengthen immunity";
    default:
      return null;
  }
}

type StackLite = {
  id: string;
  name: string;
  category: string;
  image: string;
  price: number;
};

function MissingCategoryRecommendations({
  missingCategories,
  onQuickAdd,
}: {
  missingCategories: string[];
  onQuickAdd: (stack: StackLite) => void;
}) {
  // lazy import stacks to avoid circular
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { stacks } = require("../stacks/data") as { stacks: StackLite[] };

  const wanted = Array.from(
    new Set(
      missingCategories
        .map(mapInfluencerCatToStackCat)
        .filter((x): x is string => Boolean(x))
    )
  );
  const picks: StackLite[] = [];
  const seen = new Set<string>();
  for (const w of wanted) {
    const candidate = stacks.find((s) => s.category === w);
    if (candidate && !seen.has(candidate.id)) {
      picks.push(candidate);
      seen.add(candidate.id);
    }
  }
  if (picks.length === 0) return null;

  return (
    <div className="mb-4">
      <div className="text-sm font-semibold text-gray-800 mb-2">
        Recommended to complete your routine
      </div>
      <div className="space-y-2">
        {picks.slice(0, 3).map((s) => (
          <div
            key={s.id}
            className="flex items-center gap-3 p-2 border rounded-lg"
          >
            <div className="relative w-12 h-12 overflow-hidden rounded-md bg-gray-50">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={s.image || "/placeholder.svg"}
                alt={s.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium text-gray-900">{s.name}</div>
              <div className="text-xs text-gray-500">{s.category}</div>
            </div>
            <div className="text-sm font-semibold text-sage-green mr-2">
              ${s.price}
            </div>
            <Button
              size="sm"
              className="bg-sage-green hover:bg-sage-green-600"
              onClick={() => onQuickAdd(s)}
            >
              Quick add
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
