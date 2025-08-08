import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";
import { influencers } from "../data";
import { Button } from "@/components/ui/button";
import { Instagram, Twitter } from "lucide-react";
import StackChip from "../StackChip";

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

  return (
    <div className="pt-24">
      <div className="container py-12">
        {/* 상단: 프로필 카드 확장 */}
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
                  <span className="text-gray-400 text-sm">준비 중</span>
                ) : (
                  profile.stacks.map((s) => <StackChip key={s} name={s} />)
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 중단: 먹고있는 stacks 상세 */}
        <section className="mt-12 bg-sage-green-50 rounded-2xl p-8">
          <h2 className="text-2xl font-semibold mb-4">현재 섭취 중인 Stacks</h2>
          {profile.stacks.length === 0 ? (
            <p className="text-gray-500">
              작성 예정입니다. 이 인플루언서의 스택 정보를 추가해 주세요.
            </p>
          ) : (
            <ul className="list-disc pl-6 space-y-2">
              {profile.stacks.map((s) => (
                <li key={s} className="flex items-center gap-3">
                  <StackChip name={s} className="underline text-left" />
                  <p className="text-gray-600 text-sm">
                    상세 설명을 여기에 추가하세요.
                  </p>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* 하단: 목록으로 돌아가기 */}
        <div className="mt-12 flex justify-end">
          <Button variant="outline" asChild>
            <Link href="/influencers">목록으로 돌아가기</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

export function generateStaticParams() {
  return influencers.map((i) => ({ name: i.name }));
}
