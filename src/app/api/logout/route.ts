// app/api/auth/logout/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  try {
    const response = NextResponse.json(
      { message: "Déconnecté avec succès" },
      { status: 200 }
    );

    // Supprimer les cookies
    response.cookies.set("sb-access-token", "", {
      path: "/",
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 0,
    });
    response.cookies.set("sb-refresh-token", "", {
      path: "/",
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 0,
    });

    return response;
  } catch (error) {
    console.error("Erreur logout:", error);
    return NextResponse.json(
      { error: "Erreur serveur lors de la déconnexion" },
      { status: 500 }
    );
  }
}
