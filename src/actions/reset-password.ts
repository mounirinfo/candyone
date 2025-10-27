"use server";

import { createServerSupabaseClient } from "@/lib/supabase-server";
import { redirect } from "next/navigation";

export async function resetPasswordAction(formData: FormData) {
  try {
    const password = String(formData.get("password") ?? "").trim();
    const code = String(formData.get("code") ?? "").trim();

    console.log("🧩 [resetPasswordAction] Password reçu :", password ? "✅ présent" : "❌ vide");
    console.log("🧩 [resetPasswordAction] Code reçu :", code || "❌ code vide");

    if (!password) {
      throw new Error("Le mot de passe est requis");
    }

    if (!code) {
      throw new Error("Lien invalide ou expiré");
    }

    const supabase = createServerSupabaseClient();

    console.log("⚡ Tentative d’échange du code avec Supabase...");
    const { error: verifyError, data } = await supabase.auth.exchangeCodeForSession(code);

    if (verifyError) {
      console.error("❌ Erreur exchangeCodeForSession :", verifyError);
      throw new Error("Lien invalide ou expiré (exchangeCodeForSession)");
    }

    console.log("✅ Session échangée avec succès :", data);

    console.log("🛠 Mise à jour du mot de passe...");
    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      console.error("❌ Erreur updateUser :", error);
      throw new Error(error.message);
    }

    console.log("✅ Mot de passe mis à jour, redirection vers /login");
    redirect("/login");
  } catch (err: any) {
    console.error("🔥 Erreur générale dans resetPasswordAction :", err);
    throw err;
  }
}
