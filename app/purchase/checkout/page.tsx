"use client";

import { useCart } from "@/app/context/cart-context";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CheckoutPage() {
  const { items, getTotalPrice } = useCart();
  const router = useRouter();

  const isEmpty = items.length === 0;

  const total = useMemo(() => getTotalPrice(), [items, getTotalPrice]);

  const handleMockPay = async () => {};

  return (
    <div className="pt-24 bg-sandy-beige min-h-screen">
      <div className="container px-6 py-16 max-w-3xl">
        <h1 className="text-4xl font-bold text-center mb-10">Checkout</h1>

        <Card>
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent>
            {isEmpty ? (
              <div className="text-center py-8">
                <p className="text-gray-600 mb-6">
                  This page is still under preparation.
                </p>
                <Button
                  className="bg-sage-green hover:bg-sage-green-600"
                  onClick={() => router.push("/stacks")}
                >
                  Continue Shopping
                </Button>
              </div>
            ) : (
              <>
                <div className="mb-4 rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm text-amber-800">
                  결제 단계는 현재 준비중입니다. 주문 요약만 확인 가능합니다.
                </div>
                <ul className="divide-y">
                  {items.map((it) => (
                    <li
                      key={it.id}
                      className="py-3 flex justify-between text-sm"
                    >
                      <span>
                        {it.name} × {it.quantity}
                      </span>
                      <span>${(it.price * it.quantity).toFixed(2)}</span>
                    </li>
                  ))}
                  <li className="pt-4 flex justify-between font-semibold text-base">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </li>
                </ul>
                <Button className="w-full mt-6" variant="outline" disabled>
                  결제 준비중
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
