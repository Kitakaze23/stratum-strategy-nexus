import { useState } from "react";

import { trackCtaClick } from "@/analytics/events";
import { useSection } from "@/content/useSiteContent";

import { ArrowLink, Eyebrow, HomeSection, SectionTitle } from "./shared";

function Portrait({ src, name }: { src: string; name: string }) {
  const [failed, setFailed] = useState(!src);
  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0])
    .join("");

  return (
    <div className="relative aspect-[4/5] w-full max-w-[240px] sm:max-w-[320px] lg:max-w-[360px] overflow-hidden rounded-[4px] bg-surface">
      {failed ? (
        <div
          role="img"
          aria-label={`Портрет: ${name}`}
          className="flex h-full w-full items-center justify-center"
        >
          <span className="font-serif text-6xl text-primary/25">{initials}</span>
        </div>
      ) : (
        <img
          src={src}
          alt={`${name}, основатель Stratum Consulting`}
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
          className="h-full w-full object-cover object-top"
        />
      )}
    </div>
  );
}

export function Founder() {
  const c = useSection("homeTeam");

  return (
    <HomeSection id="team" trackId="team" labelledBy="team-title">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <Portrait src={c.photo} name={c.name} />
          </div>
        </div>

        <div className="lg:col-span-7 lg:col-start-6">
          <Eyebrow>{c.eyebrow}</Eyebrow>
          <SectionTitle id="team-title">{c.title}</SectionTitle>

          <div className="mt-10 border-t border-border pt-8">
            <h3 className="text-xl font-semibold">{c.name}</h3>
            <p className="mt-1 text-[0.9375rem] font-medium text-primary">{c.role}</p>
            <div className="mt-5 space-y-4">
              {c.bio.map((paragraph, i) => (
                <p key={i} className="text-[1.0625rem] leading-[1.7] text-foreground/85">
                  {paragraph}
                </p>
              ))}
            </div>

            {c.results?.length ? (
              <dl className="mt-8 grid gap-6 sm:grid-cols-3 sm:gap-8">
                {c.results.map((r, i) => (
                  <div key={i} className="border-t-2 border-signal pt-4">
                    <dt className="font-serif text-[2rem] leading-none text-primary tabular-nums">
                      {r.value}
                    </dt>
                    <dd className="mt-3 text-sm leading-[1.55] text-muted-foreground">{r.label}</dd>
                  </div>
                ))}
              </dl>
            ) : null}

            {c.experience?.length ? (
              <div className="mt-10 border-t border-border pt-6">
                <p
                  id="founder-experience"
                  className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground"
                >
                  {c.experienceTitle}
                </p>
                <ul
                  aria-labelledby="founder-experience"
                  className="mt-4 flex flex-wrap gap-x-6 gap-y-2"
                >
                  {c.experience.map((company, i) => (
                    <li key={i} className="text-[0.9375rem] font-semibold">
                      {company}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>

          <div className="mt-10 border-t border-border pt-8">
            <h3 className="text-lg font-semibold">{c.teamTitle}</h3>
            <p className="mt-3 text-[0.9375rem] leading-[1.7] text-muted-foreground">
              {c.teamText}
            </p>
            {c.specializations?.length ? (
              <ul className="mt-6 grid gap-x-8 sm:grid-cols-2">
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
          </div>

          {c.cta ? (
            <a
              href="#contact"
              onClick={() => trackCtaClick("discuss_task", "team")}
              className="group mt-10 inline-flex text-primary underline-offset-4 hover:underline"
            >
              <ArrowLink>{c.cta}</ArrowLink>
            </a>
          ) : null}
        </div>
      </div>
    </HomeSection>
  );
}
