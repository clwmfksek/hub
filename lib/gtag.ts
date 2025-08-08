export const GA_MEASUREMENT_ID: string = process.env.NEXT_PUBLIC_GA_ID ?? "";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function isGoogleAnalyticsEnabled(): boolean {
  return typeof window !== "undefined" && GA_MEASUREMENT_ID.length > 0;
}

export function sendPageView(url: string): void {
  if (!isGoogleAnalyticsEnabled()) return;
  window.gtag?.("config", GA_MEASUREMENT_ID, {
    page_path: url,
  });
}

export function sendEvent(
  eventName: string,
  params?: Record<string, unknown>
): void {
  if (!isGoogleAnalyticsEnabled()) return;
  window.gtag?.("event", eventName, params ?? {});
}
