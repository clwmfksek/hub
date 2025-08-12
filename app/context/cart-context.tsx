"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  billingType: "one-time" | "subscribe";
}

interface CartContextType {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  updateBillingType: (id: string, billingType: CartItem["billingType"]) => void;
  getTotalPrice: () => number;
  getItemCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  // Hydrate from localStorage to persist cart across navigations/reloads
  useEffect(() => {
    try {
      const raw = localStorage.getItem("regimenhub:cart");
      if (raw) {
        const parsed: CartItem[] = JSON.parse(raw);
        if (Array.isArray(parsed)) setItems(parsed);
      }
    } catch {}
  }, []);

  // Persist to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem("regimenhub:cart", JSON.stringify(items));
    } catch {}
  }, [items]);

  const addToCart = (newItem: Omit<CartItem, "quantity">) => {
    setItems((prev) => {
      const existingItem = prev.find((item) => item.id === newItem.id);
      if (existingItem) {
        return prev.map((item) =>
          item.id === newItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      const normalized: CartItem = {
        id: newItem.id,
        name: newItem.name,
        price: newItem.price,
        image: newItem.image,
        quantity: 1,
        billingType: (newItem as Partial<CartItem>).billingType ?? "one-time",
      };
      return [...prev, normalized];
    });
  };

  const removeFromCart = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const updateBillingType = (
    id: string,
    billingType: CartItem["billingType"]
  ) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, billingType } : item))
    );
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => {
      const unitPrice =
        item.billingType === "subscribe"
          ? Math.round(item.price * 90) / 100
          : item.price;
      return total + unitPrice * item.quantity;
    }, 0);
  };

  const getItemCount = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        updateBillingType,
        getTotalPrice,
        getItemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
