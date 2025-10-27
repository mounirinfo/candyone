import { cookies } from "next/headers";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const supabase = createRouteHandlerClient({ cookies });
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error || !session) {
    console.error("❌ Pas de session:", error);
    return NextResponse.redirect("/login?error=session-missing");
  }

  // ✅ L’utilisateur est bien connecté via Google → on le redirige
  return NextResponse.redirect("/profile");
}
