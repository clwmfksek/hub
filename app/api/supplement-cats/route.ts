import { NextResponse } from "next/server";
import { getServerClient } from "@/lib/supabase/server";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const names = url.searchParams.getAll("names");
    const supabase = await getServerClient();

    let query = supabase
      .from("supplements")
      .select("name, supplement_categories(rank, categories(name))")
      .order("name");

    if (names && names.length > 0) {
      query = query.in("name", names);
    }

    const { data, error } = await query;
    if (error) throw error;

    const result: Record<string, { categories: string[]; primary?: string }> =
      {};
    for (const row of data ?? []) {
      const cats = (row.supplement_categories ?? [])
        .sort((a: any, b: any) => (a.rank ?? 0) - (b.rank ?? 0))
        .map((x: any) => x.categories?.name)
        .filter(Boolean);
      result[row.name] = { categories: cats, primary: cats[0] };
    }

    return NextResponse.json(result);
  } catch (e: any) {
    return NextResponse.json(
      { error: e?.message ?? "Server error" },
      { status: 500 }
    );
  }
}
