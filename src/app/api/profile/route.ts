// app/api/profile/route.ts
import { createServerSupabaseClient } from "@/lib/supabase-server";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const supabase = createServerSupabaseClient();

    // ✅ Récupérer la session
    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();

    if (sessionError || !session) {
      console.error("❌ Pas de session:", sessionError);
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
    }

    const user = session.user;
    console.log("✅ Utilisateur authentifié:", user.email);

    // ✅ Chercher le client
    let { data: client, error: clientError } = await supabase
      .from("client")
      .select("*")
      .eq("auth_id", user.id)
      .maybeSingle();

    if (clientError) {
      console.error("⚠️ Erreur lors de la recherche du client:", clientError);
    }

    // ✅ Si le client n'existe pas par auth_id, chercher par email
    if (!client) {
      console.log("📝 Client introuvable par auth_id, recherche par email...");

      // Chercher par email
      const { data: clientByEmail } = await supabase
        .from("client")
        .select("*")
        .eq("email", user.email)
        .maybeSingle();

      if (clientByEmail) {
        console.log("📧 Client trouvé par email, mise à jour de auth_id...");
        
        // Mettre à jour l'auth_id
        const { data: updatedClient, error: updateError } = await supabase
          .from("client")
          .update({ auth_id: user.id })
          .eq("id", clientByEmail.id)
          .select()
          .single();

        if (updateError) {
          console.error("❌ Erreur mise à jour auth_id:", updateError);
          return NextResponse.json(
            { error: "Erreur lors de la mise à jour du profil" },
            { status: 500 }
          );
        }

        console.log("✅ Client mis à jour avec auth_id:", updatedClient.id);
        client = updatedClient;
      } else {
        // Créer un nouveau client
        console.log("📝 Création d'un nouveau client...");

        const fullName = user.user_metadata?.full_name || 
                        user.user_metadata?.name || 
                        "";
        
        const prenom = user.user_metadata?.given_name || 
                      fullName.split(" ")[0] || 
                      user.email?.split("@")[0] || 
                      "Utilisateur";
        
        const nom = user.user_metadata?.family_name || 
                   fullName.split(" ").slice(1).join(" ") || 
                   "";

        const { data: newClient, error: insertError } = await supabase
          .from("client")
          .insert({
            auth_id: user.id,
            email: user.email,
            prenom: prenom,
            nom: nom,
            actif: true,
            date_inscription: new Date().toISOString().split('T')[0],
          })
          .select()
          .single();

        if (insertError) {
          console.error("❌ Erreur création client:", insertError);
          return NextResponse.json(
            { 
              error: "Erreur lors de la création du profil",
              details: insertError.message 
            },
            { status: 500 }
          );
        }

        console.log("✅ Client créé avec succès:", newClient.id);
        client = newClient;
      }
    } else {
      console.log("✅ Client existant trouvé:", client.id);
    }

    // ✅ Récupérer les adresses
    const { data: adresses } = await supabase
      .from("client_adresse")
      .select(
        `
        est_principale,
        adresse:adresse_id (
          id,
          ligne1,
          ligne2,
          code_postal,
          ville,
          pays,
          latitude,
          longitude,
          created_at,
          updated_at
        )
      `
      )
      .eq("client_id", client.id);

    // ✅ Récupérer le contrat
    const { data: contrat } = await supabase
      .from("contrat")
      .select("*")
      .eq("client_id", client.id)
      .maybeSingle();

    console.log("📋 Contrat trouvé:", contrat ? `ID: ${contrat.id}` : "Aucun");

    // ✅ Récupérer le club si contrat existe
    let club = null;
    if (contrat?.club_id) {
      const { data: c } = await supabase
        .from("club")
        .select("*")
        .eq("id", contrat.club_id)
        .single();
      club = c;
      console.log("🏋️ Club trouvé:", club?.nom);
    }

    // ✅ Récupérer TOUS les abonnements (pas seulement ACTIF)
    const { data: abonnements, error: abonnementError } = await supabase
      .from("abonnement")
      .select("*")
      .eq("contrat_id", contrat?.id)
      .order("created_at", { ascending: false }); // Le plus récent en premier

    if (abonnementError) {
      console.error("⚠️ Erreur récupération abonnements:", abonnementError);
    }

    console.log(`📦 Abonnements trouvés: ${abonnements?.length || 0}`);
    
    // Prendre le premier abonnement (le plus récent)
    const abonnement = abonnements && abonnements.length > 0 ? abonnements[0] : null;

    if (abonnement) {
      console.log("✅ Abonnement actif:", {
        id: abonnement.id,
        statut: abonnement.statut,
        prereservation: abonnement.prereservation_frais_cents ? "Oui" : "Non",
      });
    } else {
      console.log("❌ Aucun abonnement trouvé");
    }

    // ✅ Récupérer la formule si abonnement existe
    let formule = null;
    if (abonnement?.formule_id) {
      const { data: f, error: formuleError } = await supabase
        .from("formule")
        .select("*")
        .eq("id", abonnement.formule_id)
        .single();

      if (formuleError) {
        console.error("⚠️ Erreur récupération formule:", formuleError);
      } else {
        formule = f;
        console.log("💎 Formule trouvée:", formule?.nom);
      }
    }

    // ✅ Récupérer les options si abonnement existe
    let options: any[] = [];
    if (abonnement) {
      const { data: opts, error: optionsError } = await supabase
        .from("abonnement_option")
        .select(
          `
          quantite,
          prix_cents_applique,
          option:option_id (
            id,
            code,
            libelle,
            description,
            prix_cents,
            actif
          )
        `
        )
        .eq("abonnement_id", abonnement.id);

      if (optionsError) {
        console.error("⚠️ Erreur récupération options:", optionsError);
      } else {
        options = opts || [];
        console.log(`🎁 Options trouvées: ${options.length}`);
      }
    }

    // ✅ Retourner toutes les données
    return NextResponse.json({
      client,
      adresses: adresses || [],
      contrat,
      club,
      abonnement, // Le plus récent
      formule,
      options,
    });
  } catch (error) {
    console.error("💥 Erreur API profile:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}