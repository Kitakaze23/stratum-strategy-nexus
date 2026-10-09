import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";

import { Cta } from "@/components/site/primitives";
import { supabase } from "@/integrations/supabase/client";
import { usernameToEmail } from "@/lib/admin-auth";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Вход в панель управления | Stratum Consulting" },
      { name: "description", content: "Вход для администратора сайта Stratum Consulting." },
      { property: "og:title", content: "Вход в панель управления | Stratum Consulting" },
      { property: "og:description", content: "Вход для администратора сайта Stratum Consulting." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AuthPage,
});

const fieldClass =
  "h-[52px] w-full rounded-[10px] border border-input bg-background px-4 text-[0.9375rem] focus:border-primary";

function AuthPage() {
  const navigate = useNavigate();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const { error: err } = await supabase.auth.signInWithPassword({
      email: usernameToEmail(login),
      password,
    });
    setBusy(false);
    if (err) {
      setError("Неверный логин или пароль");
      return;
    }
    navigate({ to: "/admin", replace: true });
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-surface px-6">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-[420px] rounded-[14px] border border-border bg-card p-8 shadow-card"
      >
        <p className="eyebrow">Stratum Consulting</p>
        <h1 className="mt-4 text-2xl font-semibold">Панель управления</h1>
        <label htmlFor="login" className="mt-8 block text-sm font-medium">Логин</label>
        <input id="login" autoComplete="username" className={`${fieldClass} mt-2`} value={login} onChange={(e) => setLogin(e.target.value)} required />
        <label htmlFor="password" className="mt-5 block text-sm font-medium">Пароль</label>
        <input id="password" type="password" autoComplete="current-password" className={`${fieldClass} mt-2`} value={password} onChange={(e) => setPassword(e.target.value)} required />
        {error ? <p role="alert" className="mt-4 text-sm text-destructive">{error}</p> : null}
        <Cta type="submit" disabled={busy} className="mt-8 w-full">
          {busy ? "Входим…" : "Войти"}
        </Cta>
      </form>
    </main>
  );
}
