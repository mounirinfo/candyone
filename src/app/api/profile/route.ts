import { createServerSupabaseClient } from "@/lib/supabase-server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const supabase = createServerSupabaseClient();
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("sb-access-token")?.value;

    if (!accessToken) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
    }

    const {
      data: { user },
    } = await supabase.auth.getUser(accessToken);

    if (!user) {
      return NextResponse.json(
        { error: "Utilisateur non trouvé" },
        { status: 404 }
      );
    }

    const { data: client } = await supabase
      .from("client")
      .select("*")
      .eq("auth_id", user.id)
      .single();

    if (!client) {
      return NextResponse.json(
        { error: "Profil client introuvable" },
        { status: 404 }
      );
    }

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

    const { data: contrat } = await supabase
      .from("contrat")
      .select("*")
      .eq("client_id", client.id)
      .maybeSingle();

    let club = null;
    if (contrat?.club_id) {
      const { data: c } = await supabase
        .from("club")
        .select("*")
        .eq("id", contrat.club_id)
        .single();
      club = c;
    }

    const { data: abonnement } = await supabase
      .from("abonnement")
      .select("*")
      .eq("contrat_id", contrat.id)
      .eq("statut", "ACTIF")
      .maybeSingle();

    let formule = null;
    if (abonnement) {
      const { data: f } = await supabase
        .from("formule")
        .select("*")
        .eq("id", abonnement.formule_id)
        .single();
      formule = f;
    }

    let options: { quantite: any; prix_cents_applique: any; option: { id: any; code: any; libelle: any; description: any; prix_cents: any; actif: any; }[]; }[] = [];
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
    console.error("Erreur API profile:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
