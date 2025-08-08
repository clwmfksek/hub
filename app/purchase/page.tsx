import { getServerClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import ClientPurchase from "./ClientPurchase";

export default async function PurchaseOptionsPage() {
  const supabase = await getServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  // 클라이언트 상호작용이 있어 간단한 선택 상태는 클라이언트로 분리
  return <ClientPurchase />;
}
