import Image from "next/image";
import { notFound } from "next/navigation";
import { stacks } from "../data";
import AddToCartButton from "./AddToCartButton";

type Props = { params: Promise<{ id: string }> };

export default async function StackDetailPage({ params }: Props) {
  const { id } = await params;
  const stack = stacks.find((s) => s.id.toLowerCase() === id.toLowerCase());
  if (!stack) return notFound();

  return (
    <div className="pt-24">
      <div className="container py-12">
        <div className="bg-white rounded-2xl shadow-lg p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <Image
              src={stack.image || "/placeholder.svg"}
              alt={stack.name}
              width={400}
              height={400}
              className="rounded-xl object-cover w-full h-auto"
            />
          </div>
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-gray-100 text-gray-800 border">
                {stack.category}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              {stack.name}
            </h1>
            <p className="text-gray-600 mb-6">{stack.description}</p>

            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
                Ingredients
              </h3>
              <div className="flex flex-wrap gap-2">
                {stack.ingredients.map((ing) => (
                  <span
                    key={ing}
                    className="text-xs bg-gray-100 px-3 py-1 rounded-full text-gray-700 border"
                  >
                    {ing}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between gap-4">
              <p className="text-3xl font-bold text-sage-green">
                ${stack.price}
              </p>
              <AddToCartButton
                id={stack.id}
                name={stack.name}
                price={stack.price}
                image={stack.image}
              />
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
