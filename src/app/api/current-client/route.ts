import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase-server";

export async function GET() {
  const supabase = createServerSupabaseClient();

  // récupérer l'utilisateur connecté
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ client: null }, { status: 200 });
  }

  // retrouver le client lié à cet utilisateur
  const { data: client, error } = await supabase
    .from("client")
    .select("id, prenom, nom, email, telephone")
    .eq("auth_id", user.id)
    .single();

  if (error || !client) {
    return NextResponse.json({ client: null }, { status: 200 });
  }

  return NextResponse.json({ client });
}
