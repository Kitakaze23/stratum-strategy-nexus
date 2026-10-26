import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState, type KeyboardEvent } from "react";

import { trackCtaClick, trackEvent } from "@/analytics/events";
import { useSection } from "@/content/useSiteContent";
import { cn } from "@/lib/utils";

import { ArrowLink, Eyebrow, HomeSection, SectionTitle } from "./shared";

type Person = {
  name: string;
  role: string;
  photo: string;
  bio: string[];
  facts?: string[];
  results?: { value: string; label: string }[];
  experience?: string[];
};

function initialsOf(name: string): string {
  return name
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0])
    .join("");
}

function Portrait({ person, size = "large" }: { person: Person; size?: "large" | "thumb" }) {
  const [failed, setFailed] = useState(!person.photo);
  return (
    <div
      className={cn(
        "relative aspect-[4/5] shrink-0 overflow-hidden bg-surface",
        size === "thumb"
          ? "w-10 rounded-[3px]"
          : "w-full max-w-[240px] rounded-[4px] sm:max-w-[320px] lg:max-w-[360px]",
      )}
    >
      {failed ? (
        <div
          role="img"
          aria-label={`Портрет: ${person.name}`}
          className="flex h-full w-full items-center justify-center"
        >
          <span
            className={cn("font-serif text-primary/25", size === "thumb" ? "text-sm" : "text-6xl")}
          >
            {initialsOf(person.name)}
          </span>
        </div>
      ) : (
        <img
          src={person.photo}
          alt={size === "thumb" ? "" : `${person.name}, ${person.role.toLowerCase()}`}
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
          className="h-full w-full object-cover object-top"
        />
      )}
    </div>
  );
}

function Profile({
  person,
  experienceTitle,
  idx,
}: {
  person: Person;
  experienceTitle: string;
  idx: number;
}) {
  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-10">
      <div className="lg:col-span-4">
        <Portrait person={person} />
      </div>
      <div className="lg:col-span-7 lg:col-start-6">
        <h3 className="text-2xl font-semibold">{person.name}</h3>
        <p className="mt-1 text-[0.9375rem] font-medium text-primary">{person.role}</p>
        {person.facts?.length ? (
          <ul className="mt-3 space-y-1 text-sm leading-[1.5] text-muted-foreground">
            {person.facts.map((f, k) => (
              <li key={k}>{f}</li>
            ))}
          </ul>
        ) : null}

        <div className="mt-6 space-y-4">
          {person.bio.map((paragraph, k) => (
            <p key={k} className="text-[1.0625rem] leading-[1.7] text-foreground/85">
              {paragraph}
            </p>
          ))}
        </div>

        {person.results?.length ? (
          <dl className="mt-8 grid gap-6 sm:grid-cols-3 sm:gap-8">
            {person.results.map((r, k) => (
              <div key={k} className="border-t-2 border-signal pt-4">
                <dt className="font-serif text-[2rem] leading-none text-primary tabular-nums">
                  {r.value}
                </dt>
                <dd className="mt-3 text-sm leading-[1.55] text-muted-foreground">{r.label}</dd>
              </div>
            ))}
          </dl>
        ) : null}

        {person.experience?.length ? (
          <div className="mt-10 border-t border-border pt-6">
            <p
              id={`team-${idx}-experience`}
              className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground"
            >
              {experienceTitle}
            </p>
            <ul
              aria-labelledby={`team-${idx}-experience`}
              className="mt-4 flex flex-wrap gap-x-6 gap-y-2"
            >
              {person.experience.map((org, k) => (
                <li key={k} className="text-[0.9375rem] font-semibold">
                  {org}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </div>
  );
}

/**
 * Team block: one profile at a time with a person switcher (ARIA tabs) and
 * previous/next arrows. No autoplay; every profile stays in the HTML.
 */
export function Founder() {
  const c = useSection("homeTeam");
  const people: Person[] = [
    {
      name: c.name,
      role: c.role,
      photo: c.photo,
      bio: c.bio,
      results: c.results,
      experience: c.experience,
    },
    ...((c.members ?? []) as Person[]),
  ];
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const count = people.length;

  const select = (i: number, focus = false) => {
    const next = (i + count) % count;
    setActive(next);
    trackEvent("team_member_view", { member_index: next + 1 });
    if (focus) tabRefs.current[next]?.focus();
  };

  const onTabKey = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      select(i + 1, true);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      select(i - 1, true);
    } else if (e.key === "Home") {
      e.preventDefault();
      select(0, true);
    } else if (e.key === "End") {
      e.preventDefault();
      select(count - 1, true);
    }
  };

  return (
    <HomeSection id="team" trackId="team" labelledBy="team-title">
      <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-10">
        <div className="lg:col-span-5">
          <Eyebrow>{c.eyebrow}</Eyebrow>
          <SectionTitle id="team-title">{c.title}</SectionTitle>
        </div>

        {count > 1 ? (
          <div className="flex items-end justify-between gap-4 lg:col-span-7">
            <div
              role="tablist"
              aria-label="Участники команды"
              className="grid w-full grid-cols-2 gap-2 sm:flex sm:w-auto"
            >
              {people.map((p, i) => (
                <button
                  key={i}
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  type="button"
                  role="tab"
                  id={`team-tab-${i}`}
                  aria-selected={active === i}
                  aria-controls={`team-panel-${i}`}
                  tabIndex={active === i ? 0 : -1}
                  onClick={() => select(i)}
                  onKeyDown={(e) => onTabKey(e, i)}
                  className={cn(
                    "flex min-w-0 items-center gap-3 rounded-[4px] border py-2 pr-3 pl-2 text-left transition-colors duration-200 sm:shrink-0 sm:pr-4",
                    active === i
                      ? "border-primary bg-background"
                      : "border-border bg-background hover:border-primary/40",
                  )}
                >
                  <Portrait person={p} size="thumb" />
                  <span>
                    <span className="block text-sm font-semibold leading-tight">{p.name}</span>
                    <span className="mt-0.5 block text-xs text-muted-foreground">{p.role}</span>
                  </span>
                </button>
              ))}
            </div>

            <div className="hidden shrink-0 items-center gap-2 sm:flex">
              <span className="mr-1 text-sm text-muted-foreground tabular-nums" aria-hidden="true">
                {active + 1} / {count}
              </span>
              <button
                type="button"
                onClick={() => select(active - 1)}
                aria-label="Предыдущий участник команды"
                className="flex h-10 w-10 items-center justify-center rounded-[4px] border border-border text-foreground transition-colors hover:border-primary hover:text-primary"
              >
                <ChevronLeft className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => select(active + 1)}
                aria-label="Следующий участник команды"
                className="flex h-10 w-10 items-center justify-center rounded-[4px] border border-border text-foreground transition-colors hover:border-primary hover:text-primary"
              >
                <ChevronRight className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
              </button>
            </div>
          </div>
        ) : null}
      </div>

      <div className="mt-10 border-t border-border pt-10">
        {people.map((p, i) => (
          <div
            key={i}
            role={count > 1 ? "tabpanel" : undefined}
            id={`team-panel-${i}`}
            aria-labelledby={count > 1 ? `team-tab-${i}` : undefined}
            hidden={active !== i}
            tabIndex={count > 1 ? 0 : undefined}
            className="outline-none"
          >
            <Profile person={p} experienceTitle={c.experienceTitle} idx={i} />
          </div>
        ))}
      </div>

      <div className="mt-12 grid gap-10 border-t border-border pt-10 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <h3 className="text-lg font-semibold">{c.teamTitle}</h3>
          <p className="mt-3 text-[0.9375rem] leading-[1.7] text-muted-foreground">{c.teamText}</p>
        </div>
        <div className="lg:col-span-7 lg:col-start-6">
          {c.specializations?.length ? (
            <ul className="grid gap-x-8 sm:grid-cols-2">
              {c.specializations.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 border-t border-border py-3.5 text-[0.9375rem] leading-[1.5]"
                >
                  <span aria-hidden="true" className="mt-[0.75em] h-px w-3 shrink-0 bg-signal" />
                  {item}
                </li>
              ))}
            </ul>
          ) : null}
          {c.cta ? (
            <a
              href="#contact"
              onClick={() => trackCtaClick("discuss_task", "team")}
              className="group mt-8 inline-flex text-primary underline-offset-4 hover:underline"
            >
              <ArrowLink>{c.cta}</ArrowLink>
            </a>
          ) : null}
        </div>
      </div>
    </HomeSection>
  );
}
