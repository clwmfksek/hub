import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";
import { influencers } from "../data";
import { Button } from "@/components/ui/button";
import { Instagram, Twitter } from "lucide-react";
import StackChip from "../StackChip";
import { getServerClient } from "@/lib/supabase/server";
import SupplementBreakdownClient from "../SupplementBreakdownClient";

type Props = { params: Promise<{ name: string }> };

function decodeParam(param: string) {
  return decodeURIComponent(param.replace(/\+/g, " "));
}

export default async function InfluencerProfile({ params }: Props) {
  const { name } = await params;
  const nameParam = decodeParam(name);
  const profile = influencers.find(
    (i) => i.name.toLowerCase() === nameParam.toLowerCase()
  );

  if (!profile) return notFound();

  // Client component will fetch and render supplement categories

  return (
    <div className="pt-24">
      <div className="container py-12">
        {/* Profile header */}
        <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col md:flex-row gap-8">
          <Image
            src={profile.image || "/placeholder.svg"}
            alt={profile.name}
            width={160}
            height={160}
            className="rounded-full object-cover"
          />
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-bold">{profile.name}</h1>
            <p className="text-sage-green font-medium mt-1">
              {profile.specialty}
            </p>
            {profile.bio && (
              <p className="text-gray-700 mt-3 leading-relaxed">
                {profile.bio}
              </p>
            )}
            {profile.sns && (
              <div className="flex items-center gap-4 mt-3">
                {profile.sns.instagram && (
                  <Link
                    href={profile.sns.instagram}
                    target="_blank"
                    className="text-gray-600 hover:text-sage-green-700 flex items-center gap-1"
                  >
                    <Instagram size={18} />
                    <span className="text-sm">Instagram</span>
                  </Link>
                )}
                {profile.sns.x && (
                  <Link
                    href={profile.sns.x}
                    target="_blank"
                    className="text-gray-600 hover:text-sage-green-700 flex items-center gap-1"
                  >
                    <Twitter size={18} />
                    <span className="text-sm">X</span>
                  </Link>
                )}
              </div>
            )}
            <div className="mt-4">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
                Top Stacks
              </h3>
              <div className="flex flex-wrap gap-2">
                {profile.stacks.length === 0 ? (
                  <span className="text-gray-400 text-sm">Coming soon</span>
                ) : (
                  profile.stacks.map((s) => <StackChip key={s} name={s} />)
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Supplement Breakdown (full list) */}
        {profile.supplements && profile.supplements.length > 0 && (
          <SupplementBreakdownClient supplements={profile.supplements} />
        )}

        {/* Stacks details */}
        <section className="mt-12 bg-sage-green-50 rounded-2xl p-8">
          <h2 className="text-2xl font-semibold mb-4">
            Currently taking stacks
          </h2>
          {profile.stacks.length === 0 ? (
            <p className="text-gray-500">No stacks have been added yet.</p>
          ) : (
            <ul className="list-disc pl-6 space-y-2">
              {profile.stacks.map((s) => (
                <li key={s} className="flex items-center gap-3">
                  <StackChip name={s} className="underline text-left" />
                  <p className="text-gray-600 text-sm">
                    Add detailed description here.
                  </p>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Back to list */}
        <div className="mt-12 flex justify-end">
          <Button variant="outline" asChild>
            <Link href="/influencers">Back to list</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

export function generateStaticParams() {
  return influencers.map((i) => ({ name: i.name }));
}
