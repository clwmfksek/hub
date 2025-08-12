import { NextResponse } from "next/server";
import { getServerClient } from "@/lib/supabase/server";

function toSlug(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

async function ensureProfile() {
  const supabase = await getServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return;

  // Exit if profile already exists
  const { data: existing } = await supabase
    .from("profiles")
    .select("id")
    .eq("id", user.id)
    .maybeSingle();
  if (existing) return;

  const metaNickname = (user.user_metadata as any)?.nickname as
    | string
    | undefined;
  const fullName = (user.user_metadata as any)?.full_name as string | undefined;
  const emailLocal = user.email?.split("@")[0];

  const base =
    metaNickname || fullName || emailLocal || `user-${user.id.slice(0, 8)}`;
  let candidate = toSlug(base).slice(0, 24) || `user-${user.id.slice(0, 8)}`;

  // If exists, try to ignore -> on conflict, add suffix and retry up to 3 times
  for (let i = 0; i < 3; i++) {
    const { error } = await supabase
      .from("profiles")
      .insert({ id: user.id, nickname: candidate });
    if (!error) return;
    candidate = `${candidate}-${Math.floor(Math.random() * 9000 + 1000)}`.slice(
      0,
      24
    );
  }
}

export async function GET(req: Request) {
  const { searchParams, origin } = new URL(req.url);
  const code = searchParams.get("code");
  const next = "/";

  const supabase = await getServerClient();

  if (code) {
    try {
      const { error } = await supabase.auth.exchangeCodeForSession(code);
      if (!error) {
        await supabase.auth.getSession();
        await ensureProfile();
      }
    } catch {
      // Ignore and redirect to home
    }
  }

  return NextResponse.redirect(`${origin}${next}`);
}
