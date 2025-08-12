import {
  ArrowRight,
  Package,
  Sparkles,
  Star,
  Target,
  Users,
  ShoppingCart,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { stacks } from "./stacks/data";
import { Progress } from "@/components/ui/progress";
import StackCard from "./components/StackCard";
import { influencers as directoryInfluencers } from "./influencers/data";
import {
  AnimatedText,
  phraseColorClass,
  phrases,
} from "./components/animated-text";

const categories = [
  {
    name: "Sleep better",
    href: "/stacks?category=better-sleep",
    color: "bg-sleep-purple",
    tint: "bg-sleep-purple/40",
    hoverPanelBg: "group-hover:bg-sleep-purple",
    textColor: "text-violet-700",
    highlight: "first",
    icon: "🌙",
    image: "/calming-chamomile.png",
  },
  {
    name: "Boost focus",
    href: "/stacks?category=boost-focus",
    color: "bg-focus-blue",
    tint: "bg-focus-blue/40",
    hoverPanelBg: "group-hover:bg-focus-blue",
    textColor: "text-blue-700",
    icon: "🧠",
    image: "/sunlit-ginkgo-leaves.png",
  },
  {
    name: "Glow beautifully",
    href: "/stacks?category=glow-naturally",
    color: "bg-glow-pink",
    tint: "bg-glow-pink/40",
    hoverPanelBg: "group-hover:bg-glow-pink",
    textColor: "text-pink-600",
    highlight: "first",
    icon: "✨",
    image: "/dewy-rose-petals.png",
  },
  {
    name: "Balance metabolism",
    href: "/stacks?category=live-longer",
    color: "bg-longevity-green",
    tint: "bg-longevity-green/40",
    hoverPanelBg: "group-hover:bg-longevity-green",
    textColor: "text-emerald-700",
    icon: "🌱",
    image: "/ancient-tree-rings.png",
  },
  {
    name: "Boost energy",
    href: "/stacks?category=more-energy",
    color: "bg-energy-yellow",
    tint: "bg-energy-yellow/40",
    hoverPanelBg: "group-hover:bg-energy-yellow",
    textColor: "text-amber-600",
    icon: "⚡",
    image: "/sunflower-field.png",
  },
  {
    name: "Strengthen immunity",
    href: "/stacks?category=stay-healthy",
    color: "bg-health-teal",
    tint: "bg-health-teal/40",
    hoverPanelBg: "group-hover:bg-health-teal",
    textColor: "text-teal-700",
    icon: "🛡️",
    image: "/vibrant-elderberries.png",
  },
];

const influencers = [
  {
    name: "Dr. Alisa Chen",
    specialty: "Wellness Coach",
    image: "/stylish-influencer.png",
  },
  {
    name: "Markus Vance",
    specialty: "Biohacker",
    image: "/diverse-lifestyle-influencer.png",
  },
  {
    name: "Elena Rodriguez",
    specialty: "Nutritionist",
    image: "/diverse-social-media-influencers.png",
  },
];

const testimonials = [
  {
    name: "Sarah L.",
    quote:
      "RegimenHub has completely transformed my sleep. I wake up feeling refreshed and energized every single day!",
    rating: 5,
  },
  {
    name: "David K.",
    quote:
      "The focus stack is a game-changer for my productivity. No jitters, just pure, clean mental clarity.",
    rating: 5,
  },
  {
    name: "Jessica M.",
    quote:
      "I've never felt better. My skin is glowing and my energy levels are through the roof. Highly recommend!",
    rating: 5,
  },
];

export default function LandingPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative w-full min-h-screen flex flex-col items-center justify-center text-center p-6 bg-sandy-beige">
        <div className="relative max-w-5xl w-full">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-4 text-stone-900">
            <span className="block">
              <AnimatedText />
            </span>
            <span className="block">for your own longevity plan.</span>
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-10 md:mb-12 text-stone-600">
            Discover curated supplement stacks, backed by science and nature, to
            unlock your full potential.
          </p>

          {/* Regimen heading for accessibility and structure */}
          <h2 className="text-2xl md:text-3xl font-semibold text-stone-900 mb-4 md:mb-6">
            Choose your goal
          </h2>

          {/* Regimen grid – glassmorphism, text-only (no emojis), compact and polished */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
            {categories.map((category) => (
              <Link
                href={category.href}
                key={category.name}
                aria-label={`Browse stacks for ${category.name}`}
                className="group outline-none rounded-2xl focus-visible:ring-2 focus-visible:ring-sage-green-600 focus-visible:ring-offset-2 focus-visible:ring-offset-sandy-beige"
              >
                <div className="relative rounded-3xl overflow-hidden isolate motion-safe:transition motion-safe:duration-300 motion-safe:group-hover:-translate-y-0.5">
                  {/* Category color accent bar for theme consistency */}
                  <div
                    className={`absolute inset-x-0 top-0 h-1 ${category.color} rounded-t-3xl transition-all duration-300 group-hover:h-1.5 group-hover:saturate-150 group-hover:brightness-90`}
                    aria-hidden="true"
                  />

                  {/* Removed background image and heavy tint for cleaner hover */}

                  {/* Panel with category-colored hover */}
                  <div
                    className={`relative p-5 sm:p-6 bg-white/65 backdrop-blur-xl ring-1 ring-stone-200/70 shadow-sm motion-safe:group-hover:shadow-lg rounded-3xl transition-colors ${category.hoverPanelBg} group-hover:ring-stone-300`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="text-base sm:text-lg font-semibold text-stone-900 group-hover:text-white line-clamp-2">
                        {category.highlight === "first" ? (
                          <>
                            <span
                              className={`${category.textColor} group-hover:text-white`}
                            >
                              {category.name.split(" ")[0]}
                            </span>{" "}
                            <span>
                              {category.name.split(" ").slice(1).join(" ")}
                            </span>
                          </>
                        ) : (
                          <>
                            <span>
                              {category.name.split(" ").slice(0, -1).join(" ")}{" "}
                            </span>
                            <span
                              className={`${category.textColor} group-hover:text-white`}
                            >
                              {category.name.split(" ").slice(-1).join(" ")}
                            </span>
                          </>
                        )}
                      </h3>
                      {/* subtle arrow on hover for affordance */}
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-stone-900/5 text-stone-500 opacity-0 -translate-x-1 motion-safe:transition motion-safe:duration-300 group-hover:opacity-100 group-hover:translate-x-0 group-hover:bg-white/20 group-hover:text-white/90">
                        <svg
                          className="h-5 w-5"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <path d="M5 12h14" />
                          <path d="M12 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Stacks Preview */}
      <section className="w-full py-16 md:py-24 bg-white">
        <div className="container px-4 md:px-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Featured Stacks</h2>
            <Link
              href="/stacks"
              className="inline-flex items-center gap-2 text-sage-green hover:text-sage-green-700"
            >
              Browse all
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {stacks.slice(0, 6).map((s) => (
              <StackCard key={s.id} stack={s} source="home" />
            ))}
          </div>
        </div>
      </section>

      {/* Spacer below preview */}
      <section className="w-full py-4 bg-sandy-beige" />

      {/* Select Influencers Section */}
      <section className="w-full py-16 md:py-24 bg-sandy-beige">
        <div className="container px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold mb-12">Select Influencers</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {directoryInfluencers.slice(0, 6).map((inf) => (
              <Link
                key={inf.name}
                href={`/influencers/${encodeURIComponent(inf.name)}`}
                className="block bg-white p-6 rounded-2xl shadow-lg transition-transform duration-300 hover:-translate-y-2"
              >
                <Image
                  src={inf.image || "/placeholder.svg"}
                  alt={inf.name}
                  width={80}
                  height={80}
                  className="rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-semibold">{inf.name}</h3>
                <p className="text-sage-green font-medium">{inf.specialty}</p>
              </Link>
            ))}
          </div>
          <Link
            href="/influencers"
            className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-sage-green rounded-lg hover:bg-sage-green-600 transition-colors"
          >
            View All Influencers <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </>
  );
}
