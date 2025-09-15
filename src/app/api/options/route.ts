import { createServerSupabaseClient } from "@/lib/supabase-server";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = createServerSupabaseClient();

  const { data, error } = await supabase
    .from("option_abonnement")
    .select("id, code, libelle, description, prix_cents, actif");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // On ne renvoie que les options actives
  const activeOptions = data.filter((o) => o.actif);

  return NextResponse.json(activeOptions);
}
