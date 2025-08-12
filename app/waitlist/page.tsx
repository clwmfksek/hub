import { getServerClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function WaitlistPage() {
  const supabase = await getServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  // Clear cart on arrival (server → client hint via script)
  // We can't directly mutate client state here; inject a tiny script to clear storage key
  const clearCartScript = `
    try {
      localStorage.removeItem('regimenhub:cart');
    } catch {}
  `;

  return (
    <div className="pt-24 bg-sandy-beige min-h-screen">
      <div className="container px-6 py-16 max-w-2xl text-center">
        <h1 className="text-4xl font-bold mb-4">You're on the waitlist</h1>
        <p className="text-gray-600">
          Thanks for your interest! We'll notify you as soon as your order is
          ready to process.
        </p>
        <script dangerouslySetInnerHTML={{ __html: clearCartScript }} />
      </div>
    </div>
  );
}
