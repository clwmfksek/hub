"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { getBrowserClient } from "@/lib/supabase/browser";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";

const schema = z.object({
  email: z.string().email("이메일 형식이 올바르지 않습니다"),
  password: z.string().min(1, "비밀번호를 입력하세요"),
});

type FormValues = z.infer<typeof schema>;

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (values: FormValues) => {
    const supabase = getBrowserClient();
    const { error } = await supabase.auth.signInWithPassword(values);
    if (error) {
      toast({
        title: "로그인 실패",
        description: error.message,
        variant: "destructive",
      });
      return;
    }
    router.replace("/");
  };

  const onGoogle = async () => {
    const supabase = getBrowserClient();
    const redirectTo = `${window.location.origin}/auth/callback`;
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo, queryParams: { prompt: "select_account" } },
    });
    if (error) {
      toast({
        title: "Google 로그인 실패",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="pt-24 bg-sandy-beige min-h-screen">
      <div className="container px-6 py-16">
        <Card className="mx-auto w-full max-w-md bg-white rounded-2xl shadow-lg border border-stone-200/60">
          <CardHeader className="text-center pb-0">
            <CardTitle>Log in</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <Input
                  placeholder="you@example.com"
                  type="email"
                  {...form.register("email")}
                />
                {form.formState.errors.email && (
                  <p className="text-sm text-red-600">
                    {form.formState.errors.email.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Password</label>
                <Input
                  placeholder="비밀번호"
                  type="password"
                  {...form.register("password")}
                />
                {form.formState.errors.password && (
                  <p className="text-sm text-red-600">
                    {form.formState.errors.password.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full bg-sage-green hover:bg-sage-green-600"
              >
                Log in
              </Button>
              <div className="mt-3 text-right">
                <Link className="text-sm underline" href="/forgot-password">
                  비밀번호 찾기
                </Link>
              </div>
            </form>

            <div className="my-6 flex items-center gap-4">
              <div className="h-px flex-1 bg-gray-200" />
              <span className="text-xs text-gray-500">OR</span>
              <div className="h-px flex-1 bg-gray-200" />
            </div>

            <Button variant="outline" className="w-full" onClick={onGoogle}>
              Google로 로그인
            </Button>

            <p className="mt-6 text-center text-sm text-gray-600">
              계정이 없으신가요?{" "}
              <Link className="underline" href="/signup">
                Sign up
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
