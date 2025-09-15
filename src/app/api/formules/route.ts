import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase-server";

export async function GET(req: NextRequest) {
  try {
    const supabase = createServerSupabaseClient();

    const { data, error } = await supabase
      .from("formule")
      .select("*")
      .eq("actif", true);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
