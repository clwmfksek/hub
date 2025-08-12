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
};

export default function AddToCartWithConfirm({
  id,
  name,
  price,
  image,
  source,
  className,
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
