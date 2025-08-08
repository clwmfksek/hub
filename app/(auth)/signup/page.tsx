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
  nickname: z
    .string()
    .min(2, "닉네임은 최소 2자입니다")
    .max(24, "닉네임은 최대 24자입니다"),
  email: z.string().email("이메일 형식이 올바르지 않습니다"),
  password: z
    .string()
    .min(8, "비밀번호는 8자 이상")
    .max(40, "비밀번호는 40자 이하")
    .regex(/[a-z]/, "소문자 포함")
    .regex(/[A-Z]/, "대문자 포함")
    .regex(/[0-9]/, "숫자 포함")
    .regex(/[^a-zA-Z0-9]/, "기호 포함"),
});

type FormValues = z.infer<typeof schema>;

export default function SignUpPage() {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (values: FormValues) => {
    const supabase = getBrowserClient();
    const redirectTo = `${window.location.origin}/auth/callback`;

    const { error } = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
      options: {
        emailRedirectTo: redirectTo,
        data: { nickname: values.nickname },
      },
    });

    if (error) {
      toast({
        title: "회원가입 실패",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "이메일을 확인하세요",
      description:
        "인증 링크가 전송되었습니다. 인증 완료 후 자동으로 로그인됩니다.",
    });
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
            <CardTitle>Create account</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
              <div className="space-y-2">
                <label className="text-sm font-medium">닉네임</label>
                <Input placeholder="닉네임" {...form.register("nickname")} />
                {form.formState.errors.nickname && (
                  <p className="text-sm text-red-600">
                    {form.formState.errors.nickname.message}
                  </p>
                )}
              </div>
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
                <ul className="text-xs text-gray-500 grid grid-cols-2 gap-x-4">
                  <li>소문자 1개 이상</li>
                  <li>대문자 1개 이상</li>
                  <li>숫자 1개 이상</li>
                  <li>기호 1개 이상</li>
                  <li className="col-span-2">8–40자</li>
                </ul>
              </div>

              <Button
                type="submit"
                className="w-full bg-sage-green hover:bg-sage-green-600"
              >
                Continue
              </Button>
            </form>

            <div className="my-6 flex items-center gap-4">
              <div className="h-px flex-1 bg-gray-200" />
              <span className="text-xs text-gray-500">OR</span>
              <div className="h-px flex-1 bg-gray-200" />
            </div>

            <Button variant="outline" className="w-full" onClick={onGoogle}>
              Google로 가입
            </Button>

            <p className="mt-6 text-center text-sm text-gray-600">
              이미 계정이 있으신가요?{" "}
              <Link className="underline" href="/login">
                Log in
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
