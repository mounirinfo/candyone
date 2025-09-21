import { createServerSupabaseClient } from "@/lib/supabase-server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const supabase = createServerSupabaseClient();
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("sb-access-token")?.value;

    if (!accessToken) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
    }

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser(accessToken);

    if (userError || !user) {
      return NextResponse.json(
        { error: "Utilisateur non trouvé" },
        { status: 404 }
      );
    }

    // 🔹 Récupérer le profil client lié
    const { data: client, error: clientError } = await supabase
      .from("client")
      .select("id, prenom, nom, email, telephone")
      .eq("auth_id", user.id)
      .single();

    if (clientError || !client) {
      return NextResponse.json(
        { error: "Profil client introuvable" },
        { status: 404 }
      );
    }

    return NextResponse.json({ client });
  } catch (error) {
    console.error("Erreur API current-client:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
