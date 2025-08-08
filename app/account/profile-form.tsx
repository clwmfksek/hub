"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { getBrowserClient } from "@/lib/supabase/browser";

const schema = z.object({
  nickname: z
    .string()
    .min(2, "닉네임은 최소 2자입니다")
    .max(24, "닉네임은 최대 24자입니다")
    .regex(/^[a-z0-9-]+$/i, "영문/숫자/하이픈만 허용됩니다"),
});

export default function ClientForm({
  initialNickname,
}: {
  initialNickname: string;
}) {
  const { toast } = useToast();
  const form = useForm<{ nickname: string }>({
    resolver: zodResolver(schema),
    defaultValues: { nickname: initialNickname },
  });

  const onSubmit = async ({ nickname }: { nickname: string }) => {
    const supabase = getBrowserClient();
    const {
      data: { user },
      error: userErr,
    } = await supabase.auth.getUser();
    if (userErr || !user) {
      toast({
        title: "오류",
        description: "로그인이 필요합니다",
        variant: "destructive",
      });
      return;
    }

    const { error } = await supabase
      .from("profiles")
      .update({ nickname })
      .eq("id", user.id);

    if (error) {
      toast({
        title: "저장 실패",
        description: error.message,
        variant: "destructive",
      });
      return;
    }
    toast({ title: "저장 완료", description: "닉네임이 업데이트되었습니다" });
  };

  return (
    <form className="space-y-3" onSubmit={form.handleSubmit(onSubmit)}>
      <label className="text-sm font-medium">닉네임</label>
      <Input {...form.register("nickname")} className="h-11" />
      {form.formState.errors.nickname && (
        <p className="text-sm text-red-600">
          {form.formState.errors.nickname.message}
        </p>
      )}
      <Button
        type="submit"
        className="w-full bg-sage-green hover:bg-sage-green-600"
      >
        Save
      </Button>
    </form>
  );
}
