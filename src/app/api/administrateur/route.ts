// app/api/administrateur/route.ts
import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import { cookies } from "next/headers";

export async function GET() {
  const supabase = createServerSupabaseClient();
  const cookieStore = cookies();
  const accessToken = (await cookieStore).get("sb-access-token")?.value;

  if (!accessToken) {
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  }

  // Récupérer l'utilisateur courant
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser(accessToken);

  if (userError || !user) {
    return NextResponse.json({ error: "Utilisateur invalide" }, { status: 401 });
  }

  // Vérifier l'employé lié
  const { data: employe, error: employeError } = await supabase
    .from("employe")
    .select("id, role, prenom, nom")
    .eq("auth_id", user.id)
    .maybeSingle();

  if (employeError || !employe) {
    return NextResponse.json({ error: "Employé introuvable" }, { status: 404 });
  }

  // Vérification du rôle
  if (employe.role !== "ADMIN_SITE") {
    return NextResponse.json({ error: "Accès refusé : non administrateur" }, { status: 403 });
  }

  // Exemple : récupération des abonnements actifs
  const { data: abonnements, error: aboError } = await supabase
    .from("abonnement")
    .select("id, date_debut, date_fin, statut, contrat(client(prenom, nom))")
    .eq("statut", "ACTIF")
    .order("date_debut", { ascending: false });

  if (aboError) {
    return NextResponse.json({ error: aboError.message }, { status: 500 });
  }

  return NextResponse.json({
    role: employe.role,
    abonnements: abonnements || [],
  });
}
