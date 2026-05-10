import { createClient } from "@supabase/supabase-js";
import { Database } from "../types/supabase";

export const serviceClient = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_SK!,
);
