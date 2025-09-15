import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase-server";

export async function POST(req: Request) {
  try {
    const supabase = createServerSupabaseClient();
    const body = await req.json();
    const { clubId, abonnementId, options, coordonnees, acquisition } = body;

    if (!coordonnees?.email || !coordonnees?.password) {
      return NextResponse.json(
        { error: "Email et mot de passe requis" },
        { status: 400 }
      );
    }

    // 1️⃣ Création du compte utilisateur (Supabase Auth)
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: coordonnees.email,
      password: coordonnees.password,
      options: {
        data: {
          prenom: coordonnees.prenom,
          nom: coordonnees.nom,
          telephone: coordonnees.telephone,
        },
        emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
      },
    });

    if (authError) throw authError;
    const user = authData.user;
    if (!user) throw new Error("Impossible de créer l'utilisateur");

    // 2️⃣ Insertion adresse
    const { data: adresse, error: adresseError } = await supabase
      .from("adresse")
      .insert([
        {
          ligne1: `${coordonnees.numero ?? ""} ${coordonnees.rue ?? ""}`.trim(),
          code_postal: coordonnees.codePostal ?? null,
          ville: coordonnees.ville ?? null,
          pays: "FR",
        },
      ])
      .select()
      .single();

    if (adresseError) throw adresseError;

    // 3️⃣ Insertion client lié à auth_id
    const { data: client, error: clientError } = await supabase
      .from("client")
      .insert([
        {
          auth_id: user.id,
          prenom: coordonnees.prenom,
          nom: coordonnees.nom,
          email: coordonnees.email,
          telephone: coordonnees.telephone ?? null,
          date_naissance: coordonnees.anniversaire ?? null,
          acquisition_source: acquisition?.source ?? null,
          acquisition_detail: acquisition?.detail ?? null,
          utm_source: acquisition?.utm_source ?? null,
          utm_medium: acquisition?.utm_medium ?? null,
          utm_campaign: acquisition?.utm_campaign ?? null,
          utm_term: acquisition?.utm_term ?? null,
          utm_content: acquisition?.utm_content ?? null,
        },
      ])
      .select()
      .single();

    if (clientError) throw clientError;

    // 4️⃣ Création du contrat
    const referenceContrat = `CTRT-${crypto.randomUUID()
      .split("-")[0]
      .toUpperCase()}`;

    const { data: contrat, error: contratError } = await supabase
      .from("contrat")
      .insert([
        {
          client_id: client.id,
          club_id: clubId ?? null,
          reference: referenceContrat,
          date_debut: new Date().toISOString().split("T")[0], // YYYY-MM-DD
        },
      ])
      .select()
      .single();

    if (contratError) throw contratError;

    // 5️⃣ Liaison client ↔ adresse
    const { error: linkError } = await supabase.from("client_adresse").insert([
      {
        client_id: client.id,
        adresse_id: adresse.id,
        est_principale: true,
      },
    ]);
    if (linkError) throw linkError;

    // 6️⃣ Création de l'abonnement lié au contrat
    const { data: abonnement, error: abonnementError } = await supabase
      .from("abonnement")
      .insert([
        {
          contrat_id: contrat.id,
          club_id: clubId ?? null,
          formule_id: abonnementId,
          date_debut: new Date().toISOString().split("T")[0],
        },
      ])
      .select()
      .single();

    if (abonnementError) throw abonnementError;

    // 7️⃣ Insertion des options liées à l'abonnement
    if (options && Array.isArray(options) && options.length > 0) {
      const rows = options.map((optionId: string) => ({
        abonnement_id: abonnement.id,
        option_id: optionId,
        quantite: 1,
        prix_cents_applique: null,
      }));

      const { error: optionLinkError } = await supabase
        .from("abonnement_option")
        .insert(rows);

      if (optionLinkError) throw optionLinkError;
    }

    // ✅ Réponse finale
    return NextResponse.json({
      success: true,
      message:
        "Compte, contrat, abonnement et options créés avec succès. Vérifiez vos emails pour confirmer votre inscription.",
      user,
      client,
      adresse,
      contrat,
      abonnement,
      options: options ?? [],
    });
  } catch (error: any) {
    console.error("❌ Erreur inscription :", error);
    return NextResponse.json(
      { error: error.message ?? "Erreur interne serveur" },
      { status: 500 }
    );
  }
}
