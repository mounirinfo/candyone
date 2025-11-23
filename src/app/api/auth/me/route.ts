// src/app/api/auth/me/route.ts
import { createServerSupabaseClient } from "@/lib/supabase-server";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const supabase = createServerSupabaseClient();

    // ✅ Récupérer la session complète (avec tokens)
    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();

    if (sessionError || !session) {
      console.log("❌ Pas de session valide");
      return NextResponse.json({ user: null }, { status: 401 });
    }

    // ✅ Utiliser getUser() pour vérifier l'authenticité
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    console.log("🔍 Utilisateur récupéré:", {
      hasUser: !!user,
      email: user?.email || "N/A",
    });

    if (userError || !user) {
      console.log("❌ Pas d'utilisateur valide");
      return NextResponse.json({ user: null }, { status: 401 });
    }

    console.log("✅ Utilisateur trouvé:", user.email);

    // 🔍 Vérifier dans client
    const { data: client } = await supabase
      .from("client")
      .select("*")
      .eq("auth_id", user.id)
      .maybeSingle();

    // 🔍 Vérifier dans employe
    const { data: employe } = await supabase
      .from("employe")
      .select("id, role, prenom, nom")
      .eq("auth_id", user.id)
      .maybeSingle();

    let role = "client";
    let redirectTo = "/profile";
    let profile: any = client;

    if (employe) {
      role = employe.role || "employe";
      redirectTo = "/admin";
      profile = employe;
    }

    // ✅ Normaliser l'utilisateur
    const normalizedUser = {
      ...user,
      role,
      profile,
      prenom:
        profile?.prenom ||
        user.user_metadata?.prenom ||
        user.user_metadata?.full_name?.split(" ")[0] ||
        user.email?.split("@")[0],
      nom:
        profile?.nom ||
        user.user_metadata?.nom ||
        user.user_metadata?.full_name?.split(" ").slice(1).join(" ") ||
        "",
    };

    // 🔐 Récupérer toutes les sessions actives du compte (admin only avec service role)
    // Note: Pour lister toutes les sessions, il faut utiliser le service role key
    // Ici on retourne juste la session actuelle avec ses tokens
    const tokens = {
      access_token: session.access_token,
      refresh_token: session.refresh_token,
      expires_at: session.expires_at,
      expires_in: session.expires_in,
      token_type: session.token_type,
    };

    console.log("✅ Utilisateur normalisé:", {
      email: normalizedUser.email,
      prenom: normalizedUser.prenom,
      nom: normalizedUser.nom,
      role: normalizedUser.role,
    });

    console.log("🔐 Tokens de session:", {
      hasAccessToken: !!tokens.access_token,
      hasRefreshToken: !!tokens.refresh_token,
      expiresAt: tokens.expires_at ? new Date(tokens.expires_at * 1000).toLocaleString() : "N/A",
    });

    return NextResponse.json(
      {
        user: normalizedUser,
        redirectTo,
        tokens, // ✅ Ajout des tokens
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