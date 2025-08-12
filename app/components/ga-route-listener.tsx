"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { sendPageView } from "@/lib/gtag";

export function GaRouteListener(): null {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const pathWithQuery = searchParams?.toString()
      ? `${pathname}?${searchParams.toString()}`
      : pathname ?? "/";
    if (pathname) {
      sendPageView(pathWithQuery);
    }
    // Broadcast to refresh login state in header after routing
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("auth:maybe-changed"));
    }
  }, [pathname, searchParams]);

  return null;
}
