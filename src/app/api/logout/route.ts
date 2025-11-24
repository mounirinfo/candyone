// app/api/auth/logout/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createServerSupabaseClient } from "@/lib/supabase-server";

export async function POST() {
  try {
    const supabase = createServerSupabaseClient();

    // ✅ Déconnecter l'utilisateur de Supabase
    const { error: signOutError } = await supabase.auth.signOut();
    
    if (signOutError) {
      console.error("⚠️ Erreur signOut Supabase:", signOutError);
    }

    const response = NextResponse.json(
      { message: "Déconnecté avec succès" },
      { status: 200 }
    );

    // 🔥 Récupérer TOUS les cookies existants
    const cookieStore = await cookies();
    const allCookies = cookieStore.getAll();

    console.log(`🍪 Suppression de ${allCookies.length} cookies...`);

    // 🔥 Supprimer dynamiquement TOUS les cookies détectés
    allCookies.forEach((cookie) => {
      // Configuration 1 : Standard
      response.cookies.set(cookie.name, "", {
        path: "/",
        maxAge: 0,
        expires: new Date(0),
      });

      // Configuration 2 : Secure
      response.cookies.set(cookie.name, "", {
        path: "/",
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        maxAge: 0,
        expires: new Date(0),
      });

      // Configuration 3 : Strict
      response.cookies.set(cookie.name, "", {
        path: "/",
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 0,
        expires: new Date(0),
      });

      console.log(`  ✓ Cookie supprimé: ${cookie.name}`);
    });

    // 🔐 Forcer l'effacement des cookies Supabase (au cas où)
    const supabaseCookies = [
      "sb-access-token",
      "sb-refresh-token",
      "sb-provider-token",
      "sb-provider-refresh-token",
    ];

    supabaseCookies.forEach((cookieName) => {
      response.cookies.set(cookieName, "", {
        path: "/",
        maxAge: 0,
        expires: new Date(0),
      });

      response.cookies.set(cookieName, "", {
        path: "/",
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        maxAge: 0,
        expires: new Date(0),
      });
    });

    // 🔐 Cookies Google OAuth spécifiques
    const googleOAuthCookies = [
      "g_state",
      "__Secure-1PSID",
      "__Secure-3PSID",
      "SAPISID",
      "APISID",
      "SSID",
      "HSID",
      "SID",
    ];

    googleOAuthCookies.forEach((cookieName) => {
      response.cookies.set(cookieName, "", {
        path: "/",
        maxAge: 0,
        expires: new Date(0),
      });
    });

    // 🔐 Cookies Next.js Auth (si utilisé)
    const nextAuthCookies = [
      "next-auth.session-token",
      "next-auth.csrf-token",
      "next-auth.callback-url",
      "__Secure-next-auth.session-token",
      "__Host-next-auth.csrf-token",
    ];

    nextAuthCookies.forEach((cookieName) => {
      response.cookies.set(cookieName, "", {
        path: "/",
        maxAge: 0,
        expires: new Date(0),
      });

      response.cookies.set(cookieName, "", {
        path: "/",
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        maxAge: 0,
        expires: new Date(0),
      });
    });

    console.log("✅ Tous les cookies supprimés avec succès");

    return response;
  } catch (error) {
    console.error("💥 Erreur logout:", error);
    return NextResponse.json(
      { error: "Erreur serveur lors de la déconnexion" },
      { status: 500 }
    );
  }
}

export async function GET() {
  // Permettre aussi un GET pour la déconnexion (redirections)
  return POST();
}