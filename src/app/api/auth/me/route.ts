// app/api/auth/me/route.ts
import { createServerSupabaseClient } from "@/lib/supabase-server";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const supabase = createServerSupabaseClient();
    const mycookies = await cookies();
    const accessToken = mycookies.get("sb-access-token")?.value;
    const refreshToken = mycookies.get("sb-refresh-token")?.value;

    console.log("access token:", accessToken);
    console.log("refresh token:", refreshToken);

    if (!accessToken || !refreshToken) {
      return NextResponse.json({ user: null }, { status: 401 });
    }

    // Vérifier la session avec le token
    const {
      data: { user },
    } = await supabase.auth.getUser(accessToken);

    if (!user) {
      return NextResponse.json({ user: null }, { status: 401 });
    }

    console.log("user:", user);

    // Récupérer le client lié à l’utilisateur
    const { data: client, error: clientError } = await supabase
      .from("client")
      .select("*")
      .eq("auth_id", user.id)
      .single();

    if (clientError) {
      console.error("❌ Erreur récupération client:", clientError.message);
      return NextResponse.json({ error: "Client introuvable" }, { status: 404 });
    }

    // Normaliser l’utilisateur avec prénom + nom
    const normalizedUser = {
      ...user,
      user_metadata: {
        ...user.user_metadata,
        ...client,
        prenom:
          client?.prenom ||
          user.user_metadata?.prenom ||
          user.email?.split("@")[0],
        nom: client?.nom || user.user_metadata?.nom || "",
      },
    };

    return NextResponse.json({ user: normalizedUser }, { status: 200 });
  } catch (error: any) {
    console.error("Error in /api/auth/me:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
