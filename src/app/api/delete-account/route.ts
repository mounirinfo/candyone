// ============================================
// 📁 FICHIER : app/api/profile/delete-account/route.ts
// ============================================
// Supprime le compte utilisateur et toutes ses données liées

import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { createServerClient } from "@supabase/ssr";
import type { CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function DELETE() {
  try {
    const cookieStore = await cookies();

    // ✅ Client Supabase pour l'utilisateur connecté
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value;
          },
          set(name: string, value: string, options: CookieOptions) {
            cookieStore.set({ name, value, ...options });
          },
          remove(name: string, options: CookieOptions) {
            cookieStore.set({ name, value: "", ...options });
          },
        },
      }
    );

    // ✅ Client admin pour les suppressions
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseServiceKey) {
      console.error("❌ Variables d'environnement manquantes:", {
        supabaseUrl: !!supabaseUrl,
        supabaseServiceKey: !!supabaseServiceKey,
      });
      return NextResponse.json(
        { error: "Configuration serveur incorrecte. Contactez l'administrateur." },
        { status: 500 }
      );
    }

    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

    // 1️⃣ Récupérer l'utilisateur connecté
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      console.error("❌ Utilisateur non authentifié:", userError);
      return NextResponse.json(
        { error: "Utilisateur non authentifié" },
        { status: 401 }
      );
    }

    const userId = user.id;
    const userEmail = user.email;
    console.log(`🗑️ Suppression du compte de: ${userEmail}`);

    // 2️⃣ Récupérer le client lié à cet auth_id
    const { data: client, error: clientError } = await supabaseAdmin
      .from("client")
      .select("id")
      .eq("auth_id", userId)
      .single();

    if (clientError || !client) {
      console.error("⚠️ Client non trouvé, suppression auth uniquement");
      // On continue quand même pour supprimer le compte auth
    }

    const clientId = client?.id;

    // 3️⃣ Suppression en cascade des données liées au client
    if (clientId) {
      console.log(`📋 Suppression des données du client ${clientId}...`);

      // Étape 1 : Récupérer tous les contrats du client
      const { data: contrats } = await supabaseAdmin
        .from("contrat")
        .select("id")
        .eq("client_id", clientId);

      const contratIds = contrats?.map((c) => c.id) || [];

      if (contratIds.length > 0) {
        // Étape 2 : Récupérer tous les abonnements liés aux contrats
        const { data: abonnements } = await supabaseAdmin
          .from("abonnement")
          .select("id")
          .in("contrat_id", contratIds);

        const abonnementIds = abonnements?.map((a) => a.id) || [];

        if (abonnementIds.length > 0) {
          // Étape 3 : Supprimer les options d'abonnement
          console.log("🗑️ Suppression des options d'abonnement...");
          await supabaseAdmin
            .from("abonnement_option")
            .delete()
            .in("abonnement_id", abonnementIds);
        }

        // Étape 4 : Supprimer les abonnements
        console.log("🗑️ Suppression des abonnements...");
        await supabaseAdmin
          .from("abonnement")
          .delete()
          .in("contrat_id", contratIds);
      }

      // Étape 5 : Supprimer les contrats
      console.log("🗑️ Suppression des contrats...");
      await supabaseAdmin
        .from("contrat")
        .delete()
        .eq("client_id", clientId);

      // Étape 6 : Supprimer les callbacks/demandes de rappel
      if (userEmail) {
        console.log("🗑️ Suppression des callbacks...");
        await supabaseAdmin
          .from("callback")
          .delete()
          .eq("email", userEmail);
      }

      // Étape 7 : Supprimer les liens client-adresse
      console.log("🗑️ Suppression des liens client-adresse...");
      await supabaseAdmin
        .from("client_adresse")
        .delete()
        .eq("client_id", clientId);

      // Étape 8 : Supprimer le client
      console.log("🗑️ Suppression du client...");
      await supabaseAdmin
        .from("client")
        .delete()
        .eq("id", clientId);
    }

    // 4️⃣ Supprimer l'utilisateur de Supabase Auth
    console.log("🗑️ Suppression du compte auth...");
    const { error: deleteError } = await supabaseAdmin.auth.admin.deleteUser(
      userId
    );

    if (deleteError) {
      console.error("❌ Erreur suppression auth:", deleteError);
      throw deleteError;
    }

    console.log("✅ Compte supprimé avec succès");

    // 5️⃣ Nettoyer TOUS les cookies Supabase
    const response = NextResponse.json({
      success: true,
      message: "Votre compte a été supprimé avec succès ✅",
    });

    // Supprimer tous les cookies qui commencent par "sb-"
    const allCookies = cookieStore.getAll();
    allCookies.forEach((cookie) => {
      if (cookie.name.startsWith("sb-")) {
        response.cookies.set(cookie.name, "", {
          maxAge: 0,
          path: "/",
          sameSite: "lax",
        });
      }
    });

    return response;
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Erreur inconnue";
    console.error("❌ Erreur suppression compte:", errorMessage);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}