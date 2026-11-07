import { Plus } from "lucide-react";

import { trackEvent } from "@/analytics/events";
import { useSection } from "@/content/useSiteContent";

import { Eyebrow, HomeSection, SectionTitle } from "./shared";

export function Faq() {
  const c = useSection("homeFaq");

  return (
    <HomeSection id="faq" trackId="faq" labelledBy="faq-title" className="border-t border-border">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <Eyebrow>{c.eyebrow}</Eyebrow>
            <SectionTitle id="faq-title">{c.title}</SectionTitle>
          </div>
        </div>

        <div className="border-b border-border lg:col-span-7 lg:col-start-6">
          {c.items.map((item, i) => (
            <details
              key={i}
              className="group border-t border-border"
              onToggle={(e) => {
                if ((e.currentTarget as HTMLDetailsElement).open) {
                  trackEvent("faq_open", { question_index: i + 1 });
                }
              }}
            >
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-6 text-lg font-semibold leading-[1.4] transition-colors duration-200 hover:text-primary [&::-webkit-details-marker]:hidden">
                {item.q}
                <Plus
                  aria-hidden="true"
                  strokeWidth={1.5}
                  className="mt-1 h-5 w-5 shrink-0 text-primary transition-transform duration-200 group-open:rotate-45"
                />
              </summary>
              <p className="-mt-1 max-w-[640px] pb-7 text-[0.9375rem] leading-[1.7] text-muted-foreground">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </HomeSection>
  );
}
