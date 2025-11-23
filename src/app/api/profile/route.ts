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
    console.log("🔑 User ID:", user.id);

    // ✅ Chercher le client
    let { data: client, error: clientError } = await supabase
      .from("client")
      .select("*")
      .eq("auth_id", user.id)
      .maybeSingle();

    // 🔍 Debug : afficher l'erreur s'il y en a une
    if (clientError) {
      console.error("⚠️ Erreur lors de la recherche du client:", clientError);
    }

    // ✅ Si le client n'existe pas, le créer automatiquement
    if (!client) {
      console.log("📝 Client introuvable, création automatique depuis Google...");
      console.log("👤 User metadata:", user.user_metadata);

      // Extraire les informations de Google
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

      console.log("👤 Données extraites:", { prenom, nom, email: user.email });

      // ✅ Créer le client avec uniquement les colonnes qui existent
      const { data: newClient, error: insertError } = await supabase
        .from("client")
        .insert({
          auth_id: user.id,
          email: user.email,
          prenom: prenom,
          nom: nom,
          actif: true,
          date_inscription: new Date().toISOString().split('T')[0], // Format DATE
        })
        .select()
        .single();

      if (insertError) {
        console.error("❌ Erreur création client:", insertError);
        console.error("❌ Détails:", insertError.message, insertError.details, insertError.hint);
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

    // ✅ Récupérer le club si contrat existe
    let club = null;
    if (contrat?.club_id) {
      const { data: c } = await supabase
        .from("club")
        .select("*")
        .eq("id", contrat.club_id)
        .single();
      club = c;
    }

    // ✅ Récupérer l'abonnement actif
    const { data: abonnement } = await supabase
      .from("abonnement")
      .select("*")
      .eq("contrat_id", contrat?.id)
      .eq("statut", "ACTIF")
      .maybeSingle();

    // ✅ Récupérer la formule si abonnement existe
    let formule = null;
    if (abonnement) {
      const { data: f } = await supabase
        .from("formule")
        .select("*")
        .eq("id", abonnement.formule_id)
        .single();
      formule = f;
    }

    // ✅ Récupérer les options si abonnement existe
    let options: any[] = [];
    if (abonnement) {
      const { data: opts } = await supabase
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

      options = opts || [];
    }

    // ✅ Retourner toutes les données
    return NextResponse.json({
      client,
      adresses: adresses || [],
      contrat,
      club,
      abonnement,
      formule,
      options,
    });
  } catch (error) {
    console.error("💥 Erreur API profile:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}