"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getBrowserClient } from "@/lib/supabase/browser";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";

const schema = z.object({
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

export default function ResetPasswordPage() {
  const { toast } = useToast();
  const form = useForm<FormValues>({ resolver: zodResolver(schema) });

  useEffect(() => {
    // Supabase가 이 페이지로 리디렉션할 때 세션이 임시로 설정됨
  }, []);

  const onSubmit = async ({ password }: FormValues) => {
    const supabase = getBrowserClient();
    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
      toast({
        title: "변경 실패",
        description: error.message,
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "변경 완료",
      description: "새 비밀번호로 로그인할 수 있습니다.",
    });
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-24">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">Set a new password</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-2">
              <label className="text-sm font-medium">New password</label>
              <Input type="password" {...form.register("password")} />
              {form.formState.errors.password && (
                <p className="text-sm text-red-600">
                  {form.formState.errors.password.message}
                </p>
              )}
            </div>
            <Button type="submit" className="w-full">
              Update password
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
