<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Editable site content lives in `public.site_content` (one JSON row per section) shallow-merged over `src/content/defaults.ts`; components read via `useSection()` — keeps the site working with defaults if the DB is empty or unreachable.
- Admin panel at `/admin` (gated by `_authenticated` + `has_role(admin)`); login is a plain username mapped to a synthetic email in `src/lib/admin-auth.ts`; public sign-up is disabled.
