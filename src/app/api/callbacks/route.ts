import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase-server";

export async function POST(req: Request) {
  const supabase = createServerSupabaseClient();
  const body = await req.json();

  // 🔹 Vérifier le reCAPTCHA avant toute insertion
  const recaptchaToken = body.recaptcha;
  if (!recaptchaToken) {
    return NextResponse.json(
      { error: "Token reCAPTCHA manquant" },
      { status: 400 }
    );
  }

  try {
    const verifyRes = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`,
      { method: "POST" }
    );

    const verifyData = await verifyRes.json();

    if (!verifyData.success) {
      return NextResponse.json(
        { error: "Échec vérification reCAPTCHA" },
        { status: 400 }
      );
    }
  } catch (err) {
    console.error("Erreur vérification reCAPTCHA:", err);
    return NextResponse.json(
      { error: "Impossible de vérifier reCAPTCHA" },
      { status: 500 }
    );
  }

  // 🔹 Récupérer l’utilisateur connecté
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

  // 🔹 Insérer le callback
  const { data, error } = await supabase
    .from("callback")
    .insert([
      {
        client_id,
        nom: body.nom,
        telephone: body.telephone,
        email: body.email,
        message: body.message,
        notes_interne: body.notes_interne,
      },
    ])
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ callback: data }, { status: 201 });
}
