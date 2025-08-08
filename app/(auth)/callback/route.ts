// 경로 정정: 이 파일은 더 이상 사용하지 않습니다. 실 경로는 /app/auth/callback/route.ts 입니다.
export async function GET() {
  return new Response("Moved", {
    status: 308,
    headers: { Location: "/auth/callback" },
  });
}
