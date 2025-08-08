"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getBrowserClient } from "@/lib/supabase/browser";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const schema = z.object({
  email: z.string().email("이메일 형식이 올바르지 않습니다"),
});

type FormValues = z.infer<typeof schema>;

export default function ForgotPasswordPage() {
  const { toast } = useToast();
  const form = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async ({ email }: FormValues) => {
    const supabase = getBrowserClient();
    const redirectTo = `${window.location.origin}/auth/reset-password`;
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo,
    });
    if (error) {
      toast({
        title: "전송 실패",
        description: error.message,
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "메일을 확인하세요",
      description: "비밀번호 재설정 링크가 전송되었습니다.",
    });
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-24">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">Forgot your password?</CardTitle>
        </CardHeader>
        <CardContent>
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
            <Button type="submit" className="w-full">
              Send reset link
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
