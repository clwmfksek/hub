"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useEffect, useMemo } from "react";
import { useCart } from "../context/cart-context";
import { Minus, Plus, Trash2 } from "lucide-react";

export default function ShoppingCart() {
  const {
    items,
    removeFromCart,
    updateQuantity,
    updateBillingType,
    getTotalPrice,
  } = useCart();

  const subtotal = getTotalPrice();
  const shipping = 0; // Free shipping
  const total = subtotal + shipping;

  // Purchase flow is handled on a separate page

  if (items.length === 0) {
    return (
      <div className="pt-24 bg-sandy-beige min-h-screen">
        <div className="container px-6 py-16 text-center">
          <h1 className="text-4xl font-bold mb-8">Your Shopping Cart</h1>
          <div className="bg-white rounded-2xl shadow-lg p-12 border border-stone-200/60">
            <p className="text-xl text-gray-600 mb-8">Your cart is empty</p>
            <Button asChild className="bg-sage-green hover:bg-sage-green-600">
              <a href="/stacks">Continue Shopping</a>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 bg-sandy-beige min-h-screen">
      <div className="container px-6 py-16">
        <h1 className="text-4xl font-bold text-center mb-12">
          Your Shopping Cart
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Left Column - Item List */}
          <div className="lg:col-span-8 xl:col-span-9 space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-lg p-6 flex items-center gap-6 border border-stone-200/60"
              >
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  width={80}
                  height={80}
                  className="rounded-lg object-cover"
                />

                <div className="flex-1">
                  <h3 className="text-xl font-semibold">{item.name}</h3>
                  <div className="text-sm text-gray-600 mt-1">
                    <RadioGroup
                      className="flex gap-4"
                      value={item.billingType}
                      onValueChange={(v) =>
                        updateBillingType(item.id, v as any)
                      }
                    >
                      <label className="inline-flex items-center gap-2 cursor-pointer">
                        <RadioGroupItem
                          value="one-time"
                          id={`one-${item.id}`}
                        />
                        <span>One-time • ${item.price.toFixed(2)}</span>
                      </label>
                      <label className="inline-flex items-center gap-2 cursor-pointer">
                        <RadioGroupItem
                          value="subscribe"
                          id={`sub-${item.id}`}
                        />
                        <span>
                          Subscribe (10% off) • $
                          {(Math.round(item.price * 90) / 100).toFixed(2)}
                        </span>
                      </label>
                    </RadioGroup>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="h-8 w-8 p-0"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-8 text-center font-semibold">
                    {item.quantity}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="h-8 w-8 p-0"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-4 xl:col-span-3">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-32 border border-stone-200/60">
              <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-green-600">Free</span>
                </div>
                <hr />
                <div className="flex justify-between text-xl font-bold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <Button
                asChild
                className="w-full bg-sage-green hover:bg-sage-green-600 text-base py-3 rounded-lg"
              >
                <Link href="/purchase">Process to purchase</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
