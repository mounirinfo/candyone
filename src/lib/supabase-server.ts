import { createClient } from "@supabase/supabase-js";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export const createServerSupabaseClient = (accessToken?: string) => {
  if (accessToken) {
    return createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!, 
      process.env.SUPABASE_SERVICE_ROLE_KEY!, 
      {
        global: {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      }
    );
  }

  return createServerComponentClient({
    cookies: () => cookies(),
  });
};
