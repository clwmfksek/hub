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
    // 헤더의 로그인 상태가 라우팅 후 갱신되도록 브로드캐스트
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("auth:maybe-changed"));
    }
  }, [pathname, searchParams]);

  return null;
}
