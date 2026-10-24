import { createMiddleware } from "@tanstack/react-start";

/**
 * Same job as `attachSupabaseAuth` (adds the admin's bearer token to serverFn
 * RPCs), but loads the Supabase client only when a session can exist.
 * Public visitors never sign in, so their pages don't download supabase-js.
 */
function mayHaveSession(): boolean {
  if (typeof window === "undefined") return false;
  const host = location.hostname;
  // Lovable preview hosts broker the session through the editor, not localStorage.
  if (/(^|\.)(lovableproject(-dev)?\.com|lovable\.app|gpt-eng\.com|gptengineer\.run)$/.test(host)) {
    return true;
  }
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith("sb-") && key.endsWith("-auth-token")) return true;
    }
  } catch {
    return true; // storage unreadable: fall back to the safe path
  }
  return false;
}

export const attachSupabaseAuthLazy = createMiddleware({ type: "function" }).client(
  async ({ next }) => {
    if (!mayHaveSession()) return next();
    const { supabase } = await import("./client");
    const { data } = await supabase.auth.getSession();
    const token = data.session?.access_token;
    return next({
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
  },
);
