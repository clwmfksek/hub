import { getServerClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
// Remove intermediate one-time/subscribe selection page per new flow

export default async function PurchaseOptionsPage() {
  const supabase = await getServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");
  // Directly proceed to checkout according to new flow
  redirect("/purchase/checkout");
}
