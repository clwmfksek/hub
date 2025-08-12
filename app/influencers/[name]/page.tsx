import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";
import { influencers } from "../data";
import { Button } from "@/components/ui/button";
import { Instagram, Twitter } from "lucide-react";
import StackCard from "../../components/StackCard";
import { stacks } from "../../stacks/data";
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
            {/* Top Stacks section removed as requested */}
          </div>
        </div>

        {/* Currently taking stacks - moved up and styled as cards */}
        <section className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">
            Currently taking stacks
          </h2>
          {profile.stacks.length === 0 ? (
            <p className="text-gray-500">No stacks have been added yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {profile.stacks.slice(0, 6).map((n) => {
                const st = stacks.find(
                  (x) =>
                    x.name.toLowerCase() === n.toLowerCase() ||
                    x.id.toLowerCase() === n.toLowerCase()
                );
                return st ? (
                  <StackCard key={st.id} stack={st} source="influencers" />
                ) : null;
              })}
            </div>
          )}
        </section>

        {/* Supplement Breakdown (full list) - moved below and simplified */}
        {profile.supplements && profile.supplements.length > 0 && (
          <SupplementBreakdownClient supplements={profile.supplements} />
        )}

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
