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
  }, [pathname, searchParams]);

  return null;
}
