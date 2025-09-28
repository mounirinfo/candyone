// src/app/api/auth/login/route.ts
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email et mot de passe requis" },
        { status: 400 }
      );
    }

    // ✅ Utiliser l’ANON KEY pour l’auth
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    // 🔑 Authentification
    const { data: authData, error: authError } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (authError || !authData.session) {
      return NextResponse.json(
        { error: authError?.message || "Identifiants invalides" },
        { status: 401 }
      );
    }

    const user = authData.user;

    // 🔍 Vérifier si c'est un client
    const { data: client } = await supabase
      .from("client")
      .select("id")
      .eq("auth_id", user.id)
      .maybeSingle();

    // 🔍 Vérifier si c'est un employé
    const { data: employe } = await supabase
      .from("employe")
      .select("id, role")
      .eq("auth_id", user.id)
      .maybeSingle();

    let role = "client";
    let redirectTo = "/profile";

    if (employe) {
      role = employe.role || "employe";
      redirectTo = "/dashboard";
    }

    // ✅ Réponse + cookies
    const response = NextResponse.json(
      {
        success: true,
        message: "Connexion réussie",
        user,
        role,
        redirectTo,
      },
      { status: 200 }
    );

    response.cookies.set("sb-access-token", authData.session.access_token, {
      path: "/",
      httpOnly: true,
      secure: true,
      sameSite: "lax",
    });

    response.cookies.set("sb-refresh-token", authData.session.refresh_token, {
      path: "/",
      httpOnly: true,
      secure: true,
      sameSite: "lax",
    });

    return response;
  } catch (error: any) {
    console.error("❌ Erreur login :", error);
    return NextResponse.json(
      { error: error.message ?? "Erreur interne serveur" },
      { status: 500 }
    );
  }
}
