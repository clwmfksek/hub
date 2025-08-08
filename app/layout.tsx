import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "./components/header";
import { Footer } from "./components/footer";
import { CartProvider } from "./context/cart-context";
import { GoogleAnalytics } from "./components/google-analytics";
import { GaRouteListener } from "./components/ga-route-listener";
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RegimenHub - Wellness Supplements",
  description:
    "Discover curated supplement stacks, backed by science and nature, to unlock your full potential.",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} text-gray-800`}>
        <GoogleAnalytics />
        <Suspense fallback={null}>
          <GaRouteListener />
        </Suspense>
        <CartProvider>
          <Header />
          <main>
            <Suspense fallback={null}>{children}</Suspense>
          </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
