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

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!, 
    );

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
    if (!user) {
      return NextResponse.json(
        { error: "Utilisateur introuvable" },
        { status: 404 }
      );
    }

    // 2️⃣ Récupération du profil client lié
    const { data: client, error: clientError } = await supabase
      .from("client")
      .select("*")
      .eq("auth_id", user.id)
      .single();

    if (clientError) {
      console.error("Erreur récupération client :", clientError);
    }

    const response = NextResponse.json(
      {
        success: true,
        message: "Connexion réussie",
        user,
        client,
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
