// app/api/checkout/check-user/route.ts
import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase-server";

export async function GET() {
  try {
    const supabase = createServerSupabaseClient();

    // 1️⃣ Vérifier si utilisateur connecté
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ 
        isConnected: false, 
        user: null 
      });
    }

    // 2️⃣ Récupérer les infos du client
    const { data: client, error: clientError } = await supabase
      .from("client")
      .select(`
        *,
        client_adresse (
          adresse_id,
          est_principale,
          adresse (*)
        )
      `)
      .eq("auth_id", user.id)
      .single();

    if (clientError) {
      console.error("Erreur récupération client:", clientError);
    }

    // 3️⃣ Vérifier les champs manquants
    const missingFields: string[] = [];
    
    if (!client) {
      missingFields.push("all"); // Pas de client, tout manque
    } else {
      if (!client.telephone) missingFields.push("telephone");
      if (!client.date_naissance) missingFields.push("date_naissance");
      
      // Vérifier si adresse existe
      const hasAddress = client.client_adresse && 
                        client.client_adresse.length > 0 &&
                        client.client_adresse[0]?.adresse;
      
      if (!hasAddress) missingFields.push("adresse");
    }

    return NextResponse.json({
      isConnected: true,
      user: {
        id: user.id,
        email: user.email,
        prenom: client?.prenom || user.user_metadata?.prenom || "",
        nom: client?.nom || user.user_metadata?.nom || "",
      },
      client: client || null,
      missingFields,
      needsCompletion: missingFields.length > 0,
    });

  } catch (error: any) {
    console.error("❌ Erreur check-user:", error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}