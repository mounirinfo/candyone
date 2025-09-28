// /app/api/admin/route.ts
import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase-server";

export async function GET() {
  try {
    const supabase = createServerSupabaseClient();

    const { data, error } = await supabase
      .from("abonnement")
      .select(`
        id,
        date_debut,
        date_fin,
        statut,
        contrat:contrat_id (
          id,
          client:client_id (
            id,
            prenom,
            nom
          )
        ),
        coach:coach_id (
          id,
          prenom,
          nom
        )
      `)
      .eq("statut", "ACTIF")
      .order("date_debut", { ascending: false });

    if (error) throw error;

    return NextResponse.json(data);
  } catch (err: any) {
    console.error("Erreur GET /api/admin:", err.message);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
