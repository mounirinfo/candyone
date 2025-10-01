"use server";

import { createServerSupabaseClient } from "@/lib/supabase-server";
import { redirect } from "next/navigation";

export async function resetPasswordAction(formData: FormData) {
  const password = String(formData.get("password") ?? "").trim();
  if (!password) {
    throw new Error("Le mot de passe est requis");
  }

  const supabase = createServerSupabaseClient();

  const { error } = await supabase.auth.updateUser({ password });

  if (error) {
    throw new Error(error.message);
  }

  redirect("/login");
}
