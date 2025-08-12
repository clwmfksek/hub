import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "./components/header";
import { getServerClient } from "@/lib/supabase/server";
import { Footer } from "./components/footer";
import { CartProvider } from "./context/cart-context";
import { GoogleAnalytics } from "./components/google-analytics";
import { GaRouteListener } from "./components/ga-route-listener";
import { Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RegimenHub - Wellness Supplements",
  description:
    "Discover curated supplement stacks, backed by science and nature, to unlock your full potential.",
  generator: "v0.dev",
  metadataBase: new URL("https://www.regimenhub.com"),
  alternates: {
    canonical: "https://www.regimenhub.com",
  },
  openGraph: {
    title: "RegimenHub - Wellness Supplements",
    description:
      "Discover curated supplement stacks, backed by science and nature, to unlock your full potential.",
    url: "https://www.regimenhub.com",
    siteName: "RegimenHub",
    images: [
      {
        url: "/placeholder-logo.png",
        width: 1200,
        height: 630,
        alt: "RegimenHub",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "RegimenHub - Wellness Supplements",
    description:
      "Discover curated supplement stacks, backed by science and nature, to unlock your full potential.",
    images: ["/placeholder-logo.png"],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let initialLoggedIn = false;
  try {
    const supabase = await getServerClient();
    const { data } = await supabase.auth.getSession();
    initialLoggedIn = Boolean(data.session);
  } catch {}
  return (
    <html lang="en">
      <body className={`${inter.className} text-gray-800`}>
        <GoogleAnalytics />
        <Suspense fallback={null}>
          <GaRouteListener />
        </Suspense>
        <CartProvider>
          <Header initialLoggedIn={initialLoggedIn} />
          <main>
            <Suspense fallback={null}>{children}</Suspense>
          </main>
          <Footer />
        </CartProvider>
        <Toaster />
      </body>
    </html>
  );
}
