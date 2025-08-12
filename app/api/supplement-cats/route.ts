import { NextResponse } from "next/server";
import { getServerClient } from "@/lib/supabase/server";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const names = url.searchParams.getAll("names");
    const supabase = await getServerClient();

    // 1) Build alias/canonical mapping per input name
    const exactMap: Record<string, string | string[]> = {
      "Omega-3": "Omega-3 (EPA + DHA)",
      "Vitamin D + K2": ["Vitamin D3", "Vitamin K2"],
      "Vitamin D3 + K2": ["Vitamin D3", "Vitamin K2"],
      "Metformin (Rx)": "Metformin",
      "NMN or NR": "NMN",
      Magnesium: "Magnesium (Glycinate or general)",
    };

    // Manual categories for canonicals that may not exist in DB
    const manualCategoryMap: Record<string, string[]> = {
      Metformin: ["Metabolic & Weight"],
    };

    function normalizeToken(token: string): string {
      const t = token.trim();
      if (t === "Vitamin D") return "Vitamin D3";
      if (t === "K2") return "Vitamin K2";
      if (t === "Omega 3") return "Omega-3 (EPA + DHA)";
      return t;
    }

    function toCanonicalList(name: string): string[] {
      // exact map first
      const mapped = exactMap[name];
      if (mapped) return Array.isArray(mapped) ? mapped : [mapped];

      // split by '+' (combinations) → map tokens
      if (name.includes("+")) {
        const tokens = name.split("+").map((s) => normalizeToken(s));
        return tokens;
      }

      // split by ' or ' (choose first canonical)
      if (name.includes(" or ")) {
        const first = name.split(" or ")[0];
        return [normalizeToken(first)];
      }

      return [name];
    }

    const originalToCanonical: Record<string, string[]> = {};
    for (const n of names) originalToCanonical[n] = toCanonicalList(n);
    const allCanonical = Array.from(
      new Set(Object.values(originalToCanonical).flat())
    );

    // 2) Query unique canonical names only
    let query = supabase
      .from("supplements")
      .select("name, supplement_categories(categories(name))")
      .order("name");
    if (allCanonical.length > 0) query = query.in("name", allCanonical);

    const { data, error } = await query;
    if (error) throw error;

    const byCanonical: Record<string, string[]> = {};
    for (const row of data ?? []) {
      const cats = (row as any).supplement_categories
        ?.map((x: any) => x.categories?.name)
        ?.filter(Boolean) as string[];
      byCanonical[(row as any).name] = Array.isArray(cats) ? cats : [];
    }

    // fill from manualCategoryMap if missing or empty
    for (const c of allCanonical) {
      if (!byCanonical[c] || byCanonical[c].length === 0) {
        const manual = manualCategoryMap[c];
        if (manual && manual.length > 0) byCanonical[c] = manual;
      }
    }

    // 3) Build result keyed by ORIGINAL input names
    const result: Record<string, { categories: string[]; primary?: string }> =
      {};
    for (const n of names) {
      const canon = originalToCanonical[n] ?? [n];
      const merged = Array.from(
        new Set(canon.flatMap((c) => byCanonical[c] ?? []))
      );
      result[n] = { categories: merged, primary: merged[0] };
    }

    return NextResponse.json(result);
  } catch (e: any) {
    console.error("/api/supplement-cats error:", e);
    return NextResponse.json(
      { error: e?.message ?? "Server error" },
      { status: 500 }
    );
  }
}
