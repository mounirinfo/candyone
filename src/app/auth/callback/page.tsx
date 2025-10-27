"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseBrowserClient";

export default function AuthCallback() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleOAuthCallback = async () => {
      const { data, error } = await supabase.auth.exchangeCodeForSession(window.location.href);
      console.log("DEBUG exchangeCode:", { data, error });

      if (error || !data.session) {
        console.error("❌ Pas de session Google :", error);
        router.replace("/login");
        return;
      }

      const user = data.session.user;

      // Vérifie rôle employé ou client
      const { data: employe } = await supabase
        .from("employe")
        .select("id, role")
        .eq("auth_id", user.id)
        .maybeSingle();

      if (employe) {
        router.replace("/dashboard");
      } else {
        router.replace("/profile");
      }
    };

    handleOAuthCallback().finally(() => setLoading(false));
  }, [router]);

  return (
    <p style={{ textAlign: "center", marginTop: "2rem" }}>
      {loading ? "Connexion Google en cours..." : "Redirection..."}
    </p>
  );
}
