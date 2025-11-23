// app/api/login/route.ts
import { createServerSupabaseClient } from "@/lib/supabase-server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    const supabase = createServerSupabaseClient();

    // Connexion avec Supabase
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error || !data.session) {
      return NextResponse.json(
        { error: "Email ou mot de passe incorrect" },
        { status: 401 }
      );
    }

    const user = data.session.user;

    // Vérifier le rôle (employé ou client)
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

    // ✅ Renvoyer les tokens au frontend
    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        role,
      },
      access_token: data.session.access_token,  // 👈 IMPORTANT
      refresh_token: data.session.refresh_token, // 👈 IMPORTANT
      redirectTo,
    });
  } catch (error) {
    console.error("Erreur login:", error);
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}