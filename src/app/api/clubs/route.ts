// src/app/api/clubs/route.ts
import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase-server";

export async function GET() {
  try {
    const supabase = createServerSupabaseClient();
    
    const { data: clubs, error } = await supabase
      .from("club")
      .select("id, nom, code, email_contact, telephone")
      .eq("actif", true);

    if (error) throw error;

    return NextResponse.json(clubs);
  } catch (error: any) {
    console.error("❌ Erreur récupération clubs :", error);
    return NextResponse.json({ error: error.message ?? "Erreur serveur" }, { status: 500 });
  }
}
