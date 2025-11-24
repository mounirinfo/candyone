// app/api/checkout/create-subscription/route.ts


import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase-server";

export async function POST(req: Request) {
  try {
    const supabase = createServerSupabaseClient();
    const body = await req.json();
    const { 
      clubId, 
      abonnementId, 
      options, 
      telephone, 
      date_naissance,
      adresse,
      prereservation 
    } = body;

    console.log("📦 Données reçues:", body);

    // 1️⃣ Vérifier que l'utilisateur est connecté
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json(
        { error: "Vous devez être connecté" },
        { status: 401 }
      );
    }

    console.log("✅ Utilisateur connecté:", user.email);

    // 2️⃣ Récupérer le client
    const { data: client, error: clientError } = await supabase
      .from("client")
      .select("*")
      .eq("auth_id", user.id)
      .single();

    if (clientError || !client) {
      return NextResponse.json(
        { error: "Client introuvable. Veuillez vous reconnecter." },
        { status: 404 }
      );
    }

    console.log("✅ Client trouvé:", client.id);

    // 3️⃣ Mettre à jour les infos manquantes du client
    const updateData: any = {};
    if (telephone) updateData.telephone = telephone;
    if (date_naissance) updateData.date_naissance = date_naissance;

    if (Object.keys(updateData).length > 0) {
      const { error: updateError } = await supabase
        .from("client")
        .update(updateData)
        .eq("id", client.id);

      if (updateError) {
        console.error("⚠️ Erreur mise à jour client:", updateError);
      } else {
        console.log("✅ Client mis à jour");
      }
    }

    // 4️⃣ Gérer l'adresse si fournie
    let adresseId = null;
    
    if (adresse && adresse.numero && adresse.rue && adresse.codePostal && adresse.ville) {
      // Vérifier si le client a déjà une adresse principale
      const { data: existingLink } = await supabase
        .from("client_adresse")
        .select("adresse_id")
        .eq("client_id", client.id)
        .eq("est_principale", true)
        .single();

      if (existingLink) {
        // Mettre à jour l'adresse existante
        const { error: updateAdresseError } = await supabase
          .from("adresse")
          .update({
            ligne1: `${adresse.numero} ${adresse.rue}`.trim(),
            code_postal: adresse.codePostal,
            ville: adresse.ville,
            pays: "FR",
          })
          .eq("id", existingLink.adresse_id);

        if (updateAdresseError) {
          console.error("⚠️ Erreur mise à jour adresse:", updateAdresseError);
        } else {
          console.log("✅ Adresse mise à jour");
        }
        
        adresseId = existingLink.adresse_id;
      } else {
        // Créer une nouvelle adresse
        const { data: newAdresse, error: adresseError } = await supabase
          .from("adresse")
          .insert([
            {
              ligne1: `${adresse.numero} ${adresse.rue}`.trim(),
              code_postal: adresse.codePostal,
              ville: adresse.ville,
              pays: "FR",
            },
          ])
          .select()
          .single();

        if (adresseError) throw adresseError;
        
        adresseId = newAdresse.id;
        console.log("✅ Nouvelle adresse créée:", adresseId);

        // Lier l'adresse au client
        const { error: linkError } = await supabase
          .from("client_adresse")
          .insert([
            {
              client_id: client.id,
              adresse_id: adresseId,
              est_principale: true,
            },
          ]);

        if (linkError) throw linkError;
        console.log("✅ Adresse liée au client");
      }
    }

    // 5️⃣ Créer le contrat
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
          date_debut: new Date().toISOString().split("T")[0],
        },
      ])
      .select()
      .single();

    if (contratError) throw contratError;
    console.log("✅ Contrat créé:", contrat.reference);

    // 6️⃣ Créer l'abonnement
    const abonnementData: any = {
      contrat_id: contrat.id,
      club_id: clubId ?? null,
      formule_id: abonnementId,
      date_debut: new Date().toISOString().split("T")[0],
    };

    // Gérer la pré-réservation
    if (prereservation === true) {
      abonnementData.prereservation_frais_cents = 499;
      abonnementData.statut = "PAUSE";
    }

    const { data: abonnement, error: abonnementError } = await supabase
      .from("abonnement")
      .insert([abonnementData])
      .select()
      .single();

    if (abonnementError) throw abonnementError;
    console.log("✅ Abonnement créé:", abonnement.id);

    // 7️⃣ Ajouter les options
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
      console.log("✅ Options ajoutées:", options.length);
    }

    return NextResponse.json({
      success: true,
      message: prereservation
        ? "Pré-réservation effectuée avec succès !"
        : "Abonnement créé avec succès !",
      client,
      contrat,
      abonnement,
      options: options ?? [],
      prereservation: prereservation || false,
    });

  } catch (error: any) {
    console.error("❌ Erreur création abonnement:", error);
    return NextResponse.json(
      { error: error.message ?? "Erreur interne serveur" },
      { status: 500 }
    );
  }
}