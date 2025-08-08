"use client";

import { Button } from "@/components/ui/button";
import { useCart } from "../../context/cart-context";
import { sendEvent } from "@/lib/gtag";

type Props = {
  id: string;
  name: string;
  price: number;
  image: string;
};

export default function AddToCartButton({ id, name, price, image }: Props) {
  const { addToCart } = useCart();

  const handleClick = (): void => {
    addToCart({ id, name, price, image });
    sendEvent("add_to_cart", {
      currency: "USD",
      value: price,
      items: [
        {
          item_id: id,
          item_name: name,
          price,
          quantity: 1,
        },
      ],
    });
  };

  return (
    <Button
      className="px-6 py-2 bg-sage-green hover:bg-sage-green-600"
      onClick={handleClick}
    >
      Add to Cart
    </Button>
  );
}
