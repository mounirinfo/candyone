import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase-server";

export async function POST(req: Request) {
  const supabase = createServerSupabaseClient();
  const body = await req.json();

  // vérifier si un utilisateur est connecté
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let client_id: string | null = null;

  if (user) {
    const { data: client } = await supabase
      .from("client")
      .select("id")
      .eq("auth_id", user.id)
      .single();

    client_id = client?.id ?? null;
  }

  const { data, error } = await supabase
    .from("callback")
    .insert([
      {
        client_id,
        nom: body.nom,
        telephone: body.telephone,
        email: body.email,
        message: body.message,
        notes_interne: body.notes_interne, // contient le coach choisi
      },
    ])
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ callback: data }, { status: 201 });
}
