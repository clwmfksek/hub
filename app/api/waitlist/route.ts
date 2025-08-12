import { NextResponse } from "next/server";
import { getServerClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
  try {
    const supabase = await getServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const payload = await req.json();
    const { items, fromRoute, billingSummary, total } = payload ?? {};

    const { error } = await supabase.from("waitlist_entries").insert({
      user_id: user.id,
      items,
      from_route: fromRoute,
      billing_summary: billingSummary,
      total,
    });
    if (error) throw error;
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json(
      { error: e?.message ?? "Server error" },
      { status: 500 }
    );
  }
}
