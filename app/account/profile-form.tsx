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
    .min(2, "Nickname must be at least 2 characters")
    .max(24, "Nickname must be at most 24 characters")
    .regex(/^[a-z0-9-]+$/i, "Only letters, numbers, and hyphens are allowed"),
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
        title: "Error",
        description: "You must be logged in",
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
        title: "Save failed",
        description: error.message,
        variant: "destructive",
      });
      return;
    }
    toast({ title: "Saved", description: "Nickname has been updated" });
  };

  return (
    <form className="space-y-3" onSubmit={form.handleSubmit(onSubmit)}>
      <label className="text-sm font-medium">Nickname</label>
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
