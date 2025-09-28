// src/app/api/auth/me/route.ts
import { createServerSupabaseClient } from "@/lib/supabase-server";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const supabase = createServerSupabaseClient();
    const mycookies = await cookies();
    const accessToken = mycookies.get("sb-access-token")?.value;
    const refreshToken = mycookies.get("sb-refresh-token")?.value;

    if (!accessToken || !refreshToken) {
      return NextResponse.json({ user: null }, { status: 401 });
    }

    // ✅ Vérifier la session avec l’access token
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser(accessToken);

    if (userError || !user) {
      return NextResponse.json({ user: null }, { status: 401 });
    }

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

    // ✅ Normaliser l’utilisateur
    const normalizedUser = {
      ...user,
      role,
      profile,
      prenom:
        profile?.prenom || user.user_metadata?.prenom || user.email?.split("@")[0],
      nom: profile?.nom || user.user_metadata?.nom || "",
    };

    return NextResponse.json(
      { user: normalizedUser, redirectTo },
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
