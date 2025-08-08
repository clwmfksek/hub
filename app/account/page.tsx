import { getServerClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ClientForm from "./profile-form";
import EmailForm from "./email-form";

export default async function AccountPage() {
  const supabase = await getServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("nickname")
    .eq("id", user.id)
    .maybeSingle();

  return (
    <div className="pt-24 bg-sandy-beige min-h-screen">
      <div className="container px-6 py-16">
        <Card className="mx-auto w-full max-w-md bg-white rounded-2xl shadow-lg border border-stone-200/60">
          <CardHeader className="text-center pb-0">
            <CardTitle>Account</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-6">
              <EmailForm initialEmail={user.email ?? ""} />
              <ClientForm initialNickname={profile?.nickname ?? ""} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
