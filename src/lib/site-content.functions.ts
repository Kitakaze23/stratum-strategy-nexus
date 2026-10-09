import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";

import type { Database, Json } from "@/integrations/supabase/types";

type Rows = Record<string, Json>;

/** Public read of admin overrides. Returns {} on any failure so the site falls back to defaults. */
export const getSiteContentRows = createServerFn({ method: "GET" }).handler(async () => {
  const url = process.env["SUPABASE_URL"] ?? import.meta.env["VITE_SUPABASE_URL"];
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"] ?? import.meta.env["VITE_SUPABASE_PUBLISHABLE_KEY"];
  if (!url || !key) return {} as Rows;
  try {
    const client = createClient<Database>(url, key, {
      auth: { persistSession: false, autoRefreshToken: false, storage: undefined },
      global: {
        fetch: (input, init) => {
          const h = new Headers(init?.headers);
          if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) h.delete("Authorization");
          h.set("apikey", key);
          return fetch(input, { ...init, headers: h });
        },
      },
    });
    const { data, error } = await client.from("site_content").select("key, data");
    if (error || !data) return {} as Rows;
    const rows: Rows = {};
    for (const row of data) rows[row.key] = row.data;
    return rows;
  } catch (e) {
    console.error("site_content read failed", e);
    return {} as Rows;
  }
});
