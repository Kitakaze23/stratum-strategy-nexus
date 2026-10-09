import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ExternalLink, LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { FieldEditor } from "@/components/admin/FieldEditor";
import { Cta } from "@/components/site/primitives";
import { Switch } from "@/components/ui/switch";
import { Toaster } from "@/components/ui/sonner";
import {
  SECTION_LABELS,
  SECTION_ORDER,
  SITE_DEFAULTS,
  mergeContent,
  type SectionKey,
} from "@/content/defaults";
import { siteContentQuery } from "@/content/useSiteContent";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "Панель управления | Stratum Consulting" },
      { name: "description", content: "Управление разделами и текстами сайта Stratum Consulting." },
      { property: "og:title", content: "Панель управления | Stratum Consulting" },
      { property: "og:description", content: "Управление разделами и текстами сайта." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: isAdmin, isLoading: roleLoading } = useQuery({
    queryKey: ["is-admin"],
    queryFn: async () => {
      const { data: u } = await supabase.auth.getUser();
      if (!u.user) return false;
      const { data } = await supabase.rpc("has_role", { _user_id: u.user.id, _role: "admin" });
      return !!data;
    },
  });
  const { data: rows, isLoading } = useQuery(siteContentQuery);
  const content = mergeContent(rows as Record<string, unknown> | undefined);

  const [active, setActive] = useState<SectionKey>("hero");
  const [draft, setDraft] = useState<Record<string, unknown> | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!isLoading) setDraft(JSON.parse(JSON.stringify(content[active])));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, isLoading, rows]);

  const save = async (key: SectionKey, data: unknown) => {
    setSaving(true);
    const { error } = await supabase
      .from("site_content")
      .upsert({ key, data: data as never, updated_at: new Date().toISOString() });
    setSaving(false);
    if (error) {
      toast.error("Не удалось сохранить", { description: error.message });
      return false;
    }
    await queryClient.invalidateQueries({ queryKey: siteContentQuery.queryKey });
    toast.success("Сохранено");
    return true;
  };

  const toggle = async (key: SectionKey, enabled: boolean) => {
    await save(key, { ...content[key], enabled });
  };

  const reset = async () => {
    if (!confirm("Вернуть исходные тексты этого раздела?")) return;
    const { error } = await supabase.from("site_content").delete().eq("key", active);
    if (error) {
      toast.error("Не удалось сбросить", { description: error.message });
      return;
    }
    await queryClient.invalidateQueries({ queryKey: siteContentQuery.queryKey });
    toast.success("Восстановлены исходные тексты");
  };

  const signOut = async () => {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  };

  if (roleLoading || isLoading) {
    return <p className="p-10 text-muted-foreground">Загрузка…</p>;
  }
  if (!isAdmin) {
    return (
      <div className="p-10">
        <p>Нет доступа к панели управления.</p>
        <button onClick={signOut} className="mt-4 text-primary underline">Выйти</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface">
      <header className="border-b border-border bg-background">
        <div className="container-page flex h-16 items-center justify-between gap-4">
          <p className="font-semibold">Stratum · Панель управления</p>
          <div className="flex items-center gap-4 text-sm">
            <a href="/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-primary">
              Открыть сайт <ExternalLink className="h-4 w-4" />
            </a>
            <button onClick={signOut} className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground">
              <LogOut className="h-4 w-4" /> Выйти
            </button>
          </div>
        </div>
      </header>

      <div className="container-page grid gap-8 py-8 lg:grid-cols-[280px_minmax(0,1fr)]">
        <aside>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.1em] text-muted-foreground">Разделы</p>
          <ul className="space-y-1 rounded-[12px] border border-border bg-card p-2">
            {SECTION_ORDER.map((key) => (
              <li key={key} className={`flex items-center justify-between gap-2 rounded-[8px] px-3 py-2 ${active === key ? "bg-accent" : ""}`}>
                <button type="button" onClick={() => setActive(key)} className={`min-w-0 flex-1 truncate text-left text-sm ${content[key].enabled ? "" : "text-muted-foreground line-through"}`}>
                  {SECTION_LABELS[key]}
                </button>
                <Switch
                  aria-label={`Показывать раздел «${SECTION_LABELS[key]}»`}
                  checked={content[key].enabled !== false}
                  disabled={saving}
                  onCheckedChange={(v) => toggle(key, v)}
                />
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs leading-[1.6] text-muted-foreground">
            Переключатель сразу скрывает или показывает раздел на сайте.
          </p>
        </aside>

        <section className="rounded-[14px] border border-border bg-card p-6 shadow-card">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <h1 className="text-xl font-semibold">{SECTION_LABELS[active]}</h1>
            <button type="button" onClick={reset} className="text-sm text-muted-foreground underline-offset-4 hover:underline">
              Вернуть исходные тексты
            </button>
          </div>
          {draft ? (
            <FieldEditor
              name=""
              value={draft}
              template={SITE_DEFAULTS[active]}
              onChange={(v) => setDraft(v as Record<string, unknown>)}
            />
          ) : null}
          <div className="sticky bottom-0 mt-8 flex gap-3 border-t border-border bg-card pt-4 pb-2">
            <Cta type="button" disabled={saving} onClick={() => draft && save(active, draft)}>
              {saving ? "Сохраняем…" : "Сохранить"}
            </Cta>
          </div>
        </section>
      </div>
      <Toaster />
    </div>
  );
}
