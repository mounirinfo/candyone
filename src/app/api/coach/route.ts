// app/api/coach/route.ts
import { NextResponse } from "next/server";
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
