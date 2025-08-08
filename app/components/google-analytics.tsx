import Script from "next/script";
import { GA_MEASUREMENT_ID } from "@/lib/gtag";

export function GoogleAnalytics(): JSX.Element | null {
  if (!GA_MEASUREMENT_ID) return null;
  const debugMode = process.env.NODE_ENV !== "production";
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', {
            page_path: window.location.pathname,
            debug_mode: ${debugMode}
          });
        `}
      </Script>
    </>
  );
}
