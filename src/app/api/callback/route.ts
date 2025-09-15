import { cookies } from 'next/headers';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';

export async function POST() {
  const supabase = createRouteHandlerClient({ cookies });
  const { data, error } = await supabase.auth.getSession();

  if (error || !data.session) {
    return NextResponse.json({ error: 'Session introuvable' }, { status: 401 });
  }

  return NextResponse.json({ success: true });
}
