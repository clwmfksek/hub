"use client";

import { useCallback } from "react";
import { useCart } from "../context/cart-context";
import { stacks } from "../stacks/data";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";

type Props = {
  name: string;
  className?: string;
};

function slugify(name: string) {
  return name.toLowerCase().replace(/\s+/g, "");
}

export default function StackChip({ name, className }: Props) {
  const { addToCart } = useCart();

  const handleClick = useCallback(() => {
    const slug = slugify(name);
    const item =
      stacks.find((s) => s.id === slug) ||
      stacks.find((s) => s.name.toLowerCase() === name.toLowerCase());

    if (!item) {
      // Data may be missing yet: fail safely
      console.warn(`Stack not found for name: ${name}`);
      return;
    }

    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
    });
  }, [addToCart, name]);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            type="button"
            onClick={handleClick}
            className={
              className ??
              "inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/70 border border-stone-200 text-sm text-stone-700 hover:bg-white transition-colors shadow-sm"
            }
          >
            <span className="block truncate max-w-[160px]">{name}</span>
          </button>
        </TooltipTrigger>
        <TooltipContent
          side="top"
          className="bg-sage-green text-white border-none"
        >
          Add to cart
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
