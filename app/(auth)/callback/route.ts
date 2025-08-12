// Path correction: This file is no longer used. Actual route is /app/auth/callback/route.ts
export async function GET() {
  return new Response("Moved", {
    status: 308,
    headers: { Location: "/auth/callback" },
  });
}
