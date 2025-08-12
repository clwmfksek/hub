import Image from "next/image";
import { notFound } from "next/navigation";
import { stacks } from "../data";
import AddToCartButton from "./AddToCartButton";
import { Progress } from "@/components/ui/progress";

type Props = { params: Promise<{ id: string }> };

export default async function StackDetailPage({ params }: Props) {
  const { id } = await params;
  const stack = stacks.find((s) => s.id.toLowerCase() === id.toLowerCase());
  if (!stack) return notFound();

  return (
    <div className="pt-24">
      <div className="container py-12">
        {/* Header row: title + price/cta card */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Info card */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-gray-100 text-gray-800 border">
                {stack.category}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              {stack.name}
            </h1>
            <p className="text-gray-600 mb-6">{stack.description}</p>

            {/* Supplement Breakdown */}
            {stack.breakdown && stack.breakdown.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">
                  Supplement Breakdown
                </h2>
                <div className="space-y-4">
                  {stack.breakdown.map((b) => (
                    <div
                      key={b.name}
                      className="bg-gray-50 border rounded-xl p-4"
                    >
                      <div className="flex items-center justify-between mb-2 text-sm">
                        <div className="font-medium">{b.name}</div>
                        <div className="text-gray-500">
                          {[b.dose, b.timing].filter(Boolean).join(" • ")}
                        </div>
                      </div>
                      <Progress value={b.evidencePct ?? 0} />
                      {typeof b.evidencePct === "number" && (
                        <div className="text-xs text-gray-500 mt-1">
                          {b.evidencePct}% clinical backing
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Key Benefits */}
            {stack.benefits && stack.benefits.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold mb-3">Key Benefits</h2>
                <div className="flex flex-wrap gap-2">
                  {stack.benefits.map((b) => (
                    <span
                      key={b}
                      className="text-xs px-3 py-1 rounded-full border bg-white"
                    >
                      {b}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Price/CTA card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-28">
              <div className="relative w-full h-48 mb-4 overflow-hidden rounded-xl">
                <Image
                  src={stack.image || "/placeholder.svg"}
                  alt={stack.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex items-baseline gap-3 mb-4">
                <div className="text-3xl font-bold text-sage-green">
                  ${stack.price}
                </div>
                <span className="text-xs px-2 py-1 rounded bg-emerald-100 text-emerald-700">
                  Subscribe 10% off
                </span>
              </div>
              <AddToCartButton
                id={stack.id}
                name={stack.name}
                price={stack.price}
                image={stack.image}
              />
              <button className="mt-3 w-full text-sm text-gray-600 underline">
                View Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function generateStaticParams() {
  return stacks.map((s) => ({ id: s.id }));
}
