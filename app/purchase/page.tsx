import { getServerClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import ClientPurchase from "./ClientPurchase";

export default async function PurchaseOptionsPage() {
  const supabase = await getServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  // With client interactions, simple selection state is separated to the client
  return <ClientPurchase />;
}
