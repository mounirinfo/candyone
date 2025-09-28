import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase-server";

export async function GET() {
  const supabase = createServerSupabaseClient();

  const { data, error } = await supabase
    .from("callback")
    .select(`
      id,
      nom,
      telephone,
      email,
      message,
      statut,
      notes_interne,
      assigne_a_id,
      employe:assigne_a_id ( prenom, nom )
    `)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Erreur callback:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
