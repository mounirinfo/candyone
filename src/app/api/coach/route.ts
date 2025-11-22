// app/api/coach/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import { cookies } from "next/headers";

export async function GET() {
  const supabase = createServerSupabaseClient();
  const cookieStore = cookies();
  const accessToken = (await cookieStore).get("sb-access-token")?.value;

  if (!accessToken) {
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  }

  const { data: { user }, error: userError } = await supabase.auth.getUser(accessToken);
  if (userError || !user) {
    return NextResponse.json({ error: "Utilisateur invalide" }, { status: 401 });
  }

  const { data: employe } = await supabase
    .from("employe")
    .select("id, role, prenom, nom")
    .eq("auth_id", user.id)
    .maybeSingle();

  console.log("👤 Employe:", employe);

  let query = supabase.from("callback").select("*").order("created_at", { ascending: false });

  if (employe?.role === "COACH") {
    const fullName = `${employe.prenom}`.trim();
    console.log("🔎 Filtrage sur notes_interne =", fullName);
    query = query.eq("notes_interne", fullName);
  }

  const { data, error } = await query;
  console.log("✅ Callbacks:", data);
  console.log("❌ Erreur:", error);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data || []);
}

// Nouvelle méthode PUT pour mettre à jour le statut
export async function PUT(request: NextRequest) {
  try {
    const supabase = createServerSupabaseClient();
    const { id, statut } = await request.json();

    console.log("🔄 Mise à jour callback:", { id, statut });

    const { data, error } = await supabase
      .from("callback")
      .update({ statut })
      .eq("id", id)
      .select();

    if (error) {
      console.error("❌ Erreur Supabase:", error);
      throw error;
    }

    console.log("✅ Callback mis à jour:", data);
    return NextResponse.json(data[0]);
  } catch (err: any) {
    console.error("❌ Erreur PUT /api/coach:", err.message);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}