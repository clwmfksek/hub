"use client";

import Link from "next/link";
import { Leaf, ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { getServerClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { useEffect, useState } from "react";
import { useCart } from "../context/cart-context";

export function Header({
  initialLoggedIn = false,
}: {
  initialLoggedIn?: boolean;
}) {
  const { getItemCount } = useCart();
  const itemCount = getItemCount();
  const [loggedIn, setLoggedIn] = useState(initialLoggedIn);

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;

    // 초기 세션 확인
    (async () => {
      const { getBrowserClient } = await import("@/lib/supabase/browser");
      const supabase = getBrowserClient();
      if (!initialLoggedIn) {
        const { data } = await supabase.auth.getSession();
        setLoggedIn(Boolean(data.session));
      }
      const { data: sub } = supabase.auth.onAuthStateChange(() => {
        window.dispatchEvent(new Event("auth:maybe-changed"));
      });
      unsubscribe = () => sub.subscription.unsubscribe();
    })();

    const handler = async () => {
      const { getBrowserClient } = await import("@/lib/supabase/browser");
      const supabase = getBrowserClient();
      const { data } = await supabase.auth.getSession();
      setLoggedIn(Boolean(data.session));
    };
    window.addEventListener("auth:maybe-changed", handler);

    return () => {
      window.removeEventListener("auth:maybe-changed", handler);
      unsubscribe?.();
    };
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <nav className="mt-4 mx-auto max-w-6xl px-6 py-3 rounded-2xl bg-white/30 backdrop-blur-lg shadow-md border border-white/20">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Leaf className="text-sage-green-700" />
            <span className="text-xl font-bold text-gray-800">RegimenHub</span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/stacks"
              className="text-gray-700 hover:text-sage-green-700 transition-colors font-medium"
            >
              Stacks
            </Link>
            <Link
              href="/influencers"
              className="text-gray-700 hover:text-sage-green-700 transition-colors font-medium"
            >
              Influencers
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/cart"
              className="relative p-2 text-gray-700 hover:text-sage-green-700 transition-colors"
            >
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-sage-green text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
            {loggedIn ? (
              <div className="flex items-center gap-2">
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    const { getBrowserClient } = await import(
                      "@/lib/supabase/browser"
                    );
                    const supabase = getBrowserClient();
                    await supabase.auth.signOut();
                    window.location.href = "/";
                  }}
                >
                  <Button type="submit" variant="outline">
                    Log out
                  </Button>
                </form>
                <Button
                  className="bg-sage-green hover:bg-sage-green-600"
                  asChild
                >
                  <Link href="/account">Account</Link>
                </Button>
              </div>
            ) : (
              <>
                <Button variant="outline" asChild>
                  <Link href="/login">Log In</Link>
                </Button>
                <Button
                  className="bg-sage-green hover:bg-sage-green-600"
                  asChild
                >
                  <Link href="/signup">Sign Up</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </nav>
    </motion.header>
  );
}
