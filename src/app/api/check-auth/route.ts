import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase-server";

export async function GET() {
  const supabase = createServerSupabaseClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    console.error("check-auth error:", error.message);
    return NextResponse.json({ error: "Erreur authentification" }, { status: 500 });
  }

  if (!user) {
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  }

  return NextResponse.json({ userId: user.id, email: user.email });
}
