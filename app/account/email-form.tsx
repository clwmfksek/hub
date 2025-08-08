"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { getBrowserClient } from "@/lib/supabase/browser";

const schema = z.object({
  email: z.string().email("이메일 형식이 올바르지 않습니다"),
});

export default function EmailForm({ initialEmail }: { initialEmail: string }) {
  const { toast } = useToast();
  const form = useForm<{ email: string }>({
    resolver: zodResolver(schema),
    defaultValues: { email: initialEmail },
  });

  const onSubmit = async ({ email }: { email: string }) => {
    const supabase = getBrowserClient();
    const redirectTo = `${window.location.origin}/auth/callback`;
    const { error } = await supabase.auth.updateUser(
      { email },
      { emailRedirectTo: redirectTo }
    );
    if (error) {
      toast({
        title: "변경 실패",
        description: error.message,
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "확인 메일 발송",
      description: "메일의 확인 링크를 클릭하면 이메일 변경이 완료됩니다.",
    });
  };

  return (
    <form className="space-y-3" onSubmit={form.handleSubmit(onSubmit)}>
      <label className="text-sm font-medium">이메일</label>
      <Input type="email" {...form.register("email")} className="h-11" />
      {form.formState.errors.email && (
        <p className="text-sm text-red-600">
          {form.formState.errors.email.message}
        </p>
      )}
      <Button type="submit" variant="outline" className="w-full">
        이메일 변경 메일 보내기
      </Button>
    </form>
  );
}
