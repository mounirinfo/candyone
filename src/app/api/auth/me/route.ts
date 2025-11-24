// src/app/api/auth/me/route.ts
import { createServerSupabaseClient } from "@/lib/supabase-server";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const supabase = createServerSupabaseClient();

    // ✅ Récupérer la session complète
    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();

    if (sessionError) {
      console.log("❌ Erreur session:", sessionError.message);
      return NextResponse.json({ user: null }, { status: 401 });
    }

    if (!session) {
      console.log("❌ Pas de session valide");
      return NextResponse.json({ user: null }, { status: 401 });
    }

    const user = session.user;
    console.log("✅ Utilisateur authentifié:", user.email);

    // 🔍 Vérifier dans employe en premier (prioritaire)
    const { data: employe } = await supabase
      .from("employe")
      .select("id, role, prenom, nom, email")
      .eq("auth_id", user.id)
      .maybeSingle();

    // 🔍 Vérifier dans client si pas employé
    let client = null;
    if (!employe) {
      const { data: clientData } = await supabase
        .from("client")
        .select("*")
        .eq("auth_id", user.id)
        .maybeSingle();
      client = clientData;
    }

    // ✅ Déterminer le rôle et le profil
    let role = "client";
    let redirectTo = "/profile";
    let profile: any = null;

    if (employe) {
      role = employe.role || "employe";
      redirectTo = role === "admin" ? "/admin" : "/dashboard";
      profile = employe;
      console.log("👤 Employé détecté:", { role });
    } else if (client) {
      profile = client;
      console.log("👤 Client détecté");
    } else {
      console.log("⚠️ Aucun profil trouvé, création implicite possible");
    }

    // ✅ Priorité stricte : BDD > user_metadata > fallback
    const prenom = profile?.prenom || 
                   user.user_metadata?.given_name || 
                   user.user_metadata?.prenom ||
                   user.user_metadata?.full_name?.split(" ")[0] ||
                   user.email?.split("@")[0] ||
                   "Utilisateur";

    const nom = profile?.nom || 
                user.user_metadata?.family_name ||
                user.user_metadata?.nom ||
                user.user_metadata?.full_name?.split(" ").slice(1).join(" ") ||
                "";

    // ✅ Utilisateur normalisé (SANS inclure user_metadata pour éviter les conflits)
    const normalizedUser = {
      id: user.id,
      email: user.email,
      role,
      prenom,
      nom,
      profile,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };

    // 🔐 Tokens de session
    const tokens = {
      access_token: session.access_token,
      refresh_token: session.refresh_token,
      expires_at: session.expires_at,
      expires_in: session.expires_in,
    };

    console.log("✅ Utilisateur normalisé:", {
      email: normalizedUser.email,
      prenom: normalizedUser.prenom,
      nom: normalizedUser.nom,
      role: normalizedUser.role,
    });

    return NextResponse.json(
      {
        user: normalizedUser,
        redirectTo,
        tokens,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("❌ Error in /api/auth/me:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}